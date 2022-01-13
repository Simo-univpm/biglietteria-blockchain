const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


// Questo è il formato del biglietto a db
const ticketSchema = new mongoose.Schema({

    isUsed: {
        type: Boolean,
        default: false,
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    // id dell'utete che ha comprato il biglietto
    userID: {
        type: Number,
        min: [0,"Il campo userID non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"],
    },

    // id dell'evento al quale il biglietto si riferisce
    eventID: {
        type: Number,
        min: [0,"Il campo eventID non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"], 
    },

    Codice_identificativo: {
        type: Number,
        min: [0,"Il campo Codice_identificativo non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"], 
    },

    qrcode: {
        type: String,
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    sigillo_fiscale: {
        type: String, 
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },
       
    Data_emissione: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"]
    },

    Orario_emissione: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"]
    },

    Data_invalidazione: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"]
    },

    Orario_invalidazione: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"]
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
ticketSchema.plugin(AutoIncrement,  {inc_field: 'ticketID'});

ticketSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID','eventID','ticketID']});


module.exports = mongoose.model('Ticket', ticketSchema);