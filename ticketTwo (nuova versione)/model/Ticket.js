const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Questo è il formato del biglietto a db
const ticketSchema = new mongoose.Schema({

    isUsed: {
        type: Boolean,
        default: false,
        required: true
    },
    
    eventName: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    eventPlace: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    eventDate: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    eventArtists: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },
   
    ticketCreationDate: {
        type: String,
    },

    ticketCreationTime: {
        type: String,
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
ticketSchema.plugin(AutoIncrement,  {inc_field: 'ticketID'});


module.exports = mongoose.model('Ticket', ticketSchema);