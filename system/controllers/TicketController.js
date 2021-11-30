const Ticket = require('../model/Ticket');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');
const QRCode = require('qrcode')
const pdf = require('html-pdf');

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


    async invalidaBiglietto(biglietto){

        /**
         * todo, invalida biglietto che arriva dal frontend come qr (?)
         */

    }

}


module.exports = TicketController;