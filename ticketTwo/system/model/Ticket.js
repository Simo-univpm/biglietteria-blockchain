const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


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

    Codice_identificativo: {
        type: Number,
        required: true, 
    },

    qrcode: {
        type: String,
        required: true
    },

    sigillo_fiscale: {
        type: String, 
        required: true
    },
       
    Data_emissione: {
        type: String,
    },

    Orario_emissione: {
        type: String,
    },

    Data_invalidazione: {
        type: String,
    },

    Orario_invalidazione: {
        type: String,
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
ticketSchema.plugin(AutoIncrement,  {inc_field: 'ticketID'});

ticketSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID','eventID','ticketID']});


module.exports = mongoose.model('Ticket', ticketSchema);