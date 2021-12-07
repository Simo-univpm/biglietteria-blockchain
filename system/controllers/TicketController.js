const Ticket = require('../model/Ticket');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');
const QRCode = require('qrcode');
const pdf = require('html-pdf');
const crypto = require('crypto');

const EventController = require('./eventController')
const UserController = require('./userController');

const eventController = new EventController()
const userController = new UserController()


class TicketController {

    constructor(){}

    async getTicket(userID,ticketID){

        let ticket = await Ticket.findOne({ticketID: ticketID});
        if( ! ticket) return [404, 'ERROR: ticket [' + ticketID + '] not found'];

        if (ticket.userID!=userID)
            return [401,'UNATHORIZED: user [' + userID + '] has not the correct privileges to perform that action.']
        
        try{
            const eventResult = await eventController.getEvent(ticket.eventID);
            const userResult = await userController.getUser(userID);
            
            // attacca i 3 json
            ticket = {"Nome evento": eventResult[1].Nome, ...ticket.toJSON(), ...eventResult[1].toJSON(), ...userResult[1].toJSON()}
            
            return [200, ticket];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }

    async getTicketByUser(id){

        const tickets = await Ticket.find({userID: id});
        
        if( ! tickets) return [404, 'ERROR: ticket not found'];

        try{
            for (let i=0; i<tickets.length; i+=1){
                const eventResult = await eventController.getEvent(tickets[i].eventID);
                tickets[i] = {...tickets[i].toJSON(), ...eventResult[1].toJSON()}
            }

            return [200, tickets];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }

    async getTicketByEvent(id){

        const ticket = await Ticket.find({eventID: id});
        if( ! ticket) return [404, 'ERROR: ticket not found'];

        try{
            return [200, ticket];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }
    

    async createTicket(userID, eventID){

        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();

        // CREAZIONE NUOVO UTENTE:
        const ticket = new Ticket({

            isUsed: false,
            userID: userID,
            eventID: eventID,

            ticketCreationDate: currentDate,
            ticketCreationTime: currentTime

        });
        
        /**
         * 
         * - hash del biglietto per fare il sigillo
         * - calcolare poi la firma dell'hash con la chiave privata di ticketTwo
         *      -> garantisce autenticità della firma
         * 
         */

        ticket.sigillo_fiscale = crypto.sign("SHA256", JSON.stringify(ticket), process.env.RSA_PRIVATE_KEY).toString("hex")

        // crea qr code
        ticket.qrcode = await QRCode.toDataURL(JSON.stringify(ticket))
    
        try{
            const savedTicket = await ticket.save();
            return [200, 'SUCCESS: ticket [' + savedTicket.ticketID + '] created'];   
        }catch(err){
            return [500, "SERVER ERROR: couldn't create ticket " + err];
        }

    }

    async downloadTicket(ticket){

        return new Promise((resolve,reject) => {
            pdf.create(ticket,{ format: "A4"}).toBuffer(function(err,buffer){
                resolve(buffer);
            });
        })     
        
    }


    async invalidaBiglietto(ticketID){

        /**
         * todo, invalida biglietto che arriva dal frontend come qr (?)
         */

        const ticket = await Ticket.findOne({ticketID: ticketID});
        if( ! ticket) return [404, 'ERROR: ticket [' + ticketID + '] not found'];

        const sigillo_fiscale = Buffer.from(ticket.sigillo_fiscale,"hex")
        ticket.sigillo_fiscale = undefined
        ticket.qrcode = undefined
        const isVerified = crypto.verify("SHA256", JSON.stringify(ticket), process.env.RSA_PUBLIC_KEY, sigillo_fiscale);

    }

}


module.exports = TicketController;