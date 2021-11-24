const Event = require('../model/Event');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');


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


        const event = await Event.findOne({eventID: eventID});
        
        if( ! event) return [404, 'ERROR: event [' + id + '] not found'];

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

}


module.exports = EventController;