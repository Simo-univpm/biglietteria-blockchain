const Event = require('../model/Event');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');

const SmartContract = require('web3-eth-contract')
SmartContract.setProvider(process.env.RPC_URL)



const Web3 = require("web3-eth-personal")
const web3 = new Web3(process.env.RPC_URL)

class EventController {

    constructor(){}

    async getAllEvents(){

        try{
            const events = await Event.find();
            return [200, events];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all events'];
        }
    
    }

    async getEvent(id){
    
        const event = await Event.findOne({eventID: id});
        if( ! event) return [404, 'ERROR: event [' + id + '] not found'];

        try{
            return [200, event];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }

    async getEventByType(type,user){
        
        const query = {type: type};
        if (user==undefined || user.privileges=="Cliente")
            query.stato = 1
        //else if (user.privileges=="Organizzatore eventi")
            //query.Organizzatore = user.Organizzatore
        const event = await Event.find(query)
        if( ! event) return [404, 'ERROR: getting events of that types'];

        try{
            return [200, event];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }

    async createEvent(eventData){

        /**
         * TODO: inserire tutti i controlli necessari
         */

        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();

        // CREAZIONE NUOVO EVENTO:
        const event = new Event({

            type: eventData.type,
            Icona_evento: eventData.Icona_evento,
            Nome: eventData.Nome,
            Luogo: eventData.Luogo,
            Artisti: eventData.Artisti,
            Data_evento: eventData.Data_evento,
            Posti_totali: eventData.Posti_totali,
            Posti_disponibili: eventData.Posti_totali,
            Orario: eventData.Orario,
            Organizzatore: eventData.Organizzatore,
            Prezzo: eventData.Prezzo,
            stato: 0,

            eventCreationDate: currentDate,
            eventCreationTime: currentTime

        });
    
        try{
            const savedEvent = await event.save();
            return [200, 'SUCCESS: event with id [' + savedEvent.eventID + '] created'];   
        }catch(err){
            return [500, "SERVER ERROR: couldn't save event " + err];
        }
        
    }

    async updateEvent(eventData,eventID){

        const event = await Event.findOne({eventID: eventID, stato:0});
        
        if( ! event) return [404, 'ERROR: event [' + eventID + '] not found'];

        if (eventData.type!=undefined)
            event.type = eventData.type
        event.Nome = eventData.Nome
        event.Luogo = eventData.Luogo
        event.Artisti = eventData.Artisti
        event.Data_evento = eventData.Data_evento
        event.Posti_totali = eventData.Posti_totali
        event.Posti_disponibili = eventData.Posti_totali
        event.Orario = eventData.Orario
        event.Prezzo = eventData.Prezzo

        const savedEvent = await event.save();
        if( ! savedEvent) return [500, 'SERVER ERROR'];

        return [200, 'SUCCESS: user [' + savedEvent.eventID + '] updated'];

    }

    async deleteEvent(id){

        const result = await Event.deleteOne({eventID: id, stato:0});
        if (result.deletedCount==0)
            return [404, 'ERROR: event [' + id + '] not found']

        return [200, 'SUCCESS: event [' + id + '] was deleted'];
        

    }

    async apriVendite(eventID,annullatore,manager_wallet){

        const event = await Event.findOne({eventID: eventID, stato:0});
        if( ! event) return [404, 'ERROR: event [' + eventID + '] not found'];

        event.stato = 1;
        const abi = JSON.parse(process.env.ABI)
        const bytecode = JSON.parse(process.env.BYTECODE)

        //await web3.unlockAccount(manager_wallet,manager_key)
        
        const contract = await new SmartContract(abi).deploy({data:bytecode,arguments:[event.Posti_totali,event.eventID,annullatore]}).send({from: manager_wallet})
        //await web3.lockAccount(manager_wallet)

        event.WalletAddress = contract.options.address

        const savedEvent = await event.save();
        if( ! savedEvent) return [500, 'SERVER ERROR'];

        return [200, 'SUCCESS: ticket sales for event [' + savedEvent.eventID + '] is open'];

            
    }

    async chiudiVendite(eventID){
        
        const event = await Event.findOne({eventID: eventID, stato:1});
        if( ! event) return [404, 'ERROR: event [' + eventID + '] not found'];

        /*event.stato = 2;

        const savedEvent = await event.save();
        if( ! savedEvent) return [500, 'SERVER ERROR'];

        return [200, 'SUCCESS: ticket sales for event [' + savedEvent.eventID + '] is closed'];*/

        const abi = JSON.parse(process.env.ABI)
        const contract = await new SmartContract(abi,event.WalletAddress)

        //console.log(await contract.methods.getEvento().call())

        console.log(contract.methods)

        
        
        //const a = await contract.methods.getAnnullatore().call()//.send({from: "0x2f2d84719da9b9ed61d53ef6c797d806a167c1b8"})
        //const a = await contract.methods.richieste_biglietti("0x8024b7c412dAaA46dcC6Bf542856f6589c49d904").call()
        //console.log(a)

        return [200,"success"]

    }

}


module.exports = EventController;