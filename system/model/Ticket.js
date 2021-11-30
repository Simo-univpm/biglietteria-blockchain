const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Questo è il formato del biglietto a db
const ticketSchema = new mongoose.Schema({

    isUsed: {
        type: Boolean,
        default: false,
        required: true
    },

    // id dell'utete che ha comprato il biglietto
    userID: {
        type: Number,
        required: true,
    },

    // id dell'evento al quale il biglietto si riferisce
    eventID: {
        type: Number,
        required: true, 
    },

    qrcode: {
        type: String,
        required: true
    },
       
    ticketCreationDate: {
        type: String,
    },

    ticketCreationTime: {
        type: String,
    },

    

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
ticketSchema.plugin(AutoIncrement,  {inc_field: 'ticketID'});


module.exports = mongoose.model('Ticket', ticketSchema);