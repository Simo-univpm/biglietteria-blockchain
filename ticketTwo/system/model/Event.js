const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


// Questo è il formato dell'evento a db
const eventSchema = new mongoose.Schema({
    
    // cinema, teatro e quant'altro
    type: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    stato: {
        type: Number,
        default: 0,
        required: true
    },

    // percorso del file immagine della locandina
    Icona_evento: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Nome: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Luogo: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Data_evento: {
        type: String,
        min: 8,
        max: 10,
        required: true
    },

    Posti_totali: {
        type: Number,
        min: 1,
        max: 100000,
        required: true
    },

    Posti_disponibili: {
        type: Number,
        min: 1,
        max: 100000,
        required: true
    },

    Orario: {
        type: String,
        min: 5,
        max: 5,
        required: true
    },

    Organizzatore: {
        type: String,
        min: 1,
        max: 128,
        required: true
    },

    Artisti: {
        type: String,
        required: true
    },

    Prezzo: {
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
    },

    ContractAbi: {
        type: String,
        required: false
    },

    Indirizzo_contratto: {
        type: String,
        required: false
    },

    WalletAutomaticTicketOffice: {
        type: String,
        required: false
    },

    PasswordAutomaticTicketOffice: {
        type: String,
        required: false
    }

});


// Campo eventID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto

eventSchema.plugin(AutoIncrement,  {inc_field: 'eventID'});

eventSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ["eventID","type","stato","Organizzatore"]
});

module.exports = mongoose.model('Event2', eventSchema);