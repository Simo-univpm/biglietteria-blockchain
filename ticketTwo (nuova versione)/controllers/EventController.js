const Event = require('../model/Event');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');
const bcrypt = require('bcryptjs');


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

    async getEventByType(type){
    
        const event = await Event.find({type: type});
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
            immagine: eventData.immagine,
            nome: eventData.nome,
            luogo: eventData.luogo,
            data: eventData.data,
            postiTotali: eventData.postiTotali,
            postiDisponibili: eventData.postiDisponibili,
            orario: eventData.orario,
            organizzatore: eventData.organizzatore,
            prezzo: eventData.prezzo,

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

}


module.exports = EventController;