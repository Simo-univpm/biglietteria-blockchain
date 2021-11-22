const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Questo è il formato del biglietto a db
const eventSchema = new mongoose.Schema({
    
    // cinema, teatro e quant'altro
    type: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    // percorso del file immagine della locandina
    immagine: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    nome: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    luogo: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    data: {
        type: String,
        min: 8,
        max: 10,
        required: true
    },

    postiTotali: {
        type: Number,
        min: 1,
        max: 100000,
        required: true
    },

    postiDisponibili: {
        type: Number,
        min: 1,
        max: 100000,
        required: true
    },

    orario: {
        type: String,
        min: 5,
        max: 5,
        required: true
    },

    organizzatore: {
        type: String,
        min: 1,
        max: 128,
        required: true
    },

    prezzo: {
        type: Number,
        min: 1,
        max: 50000,
        required: true
    },
   
    eventCreationDate: {
        type: String,
    },

    eventCreationTime: {
        type: String,
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
eventSchema.plugin(AutoIncrement,  {inc_field: 'eventID'});


module.exports = mongoose.model('Event', eventSchema);