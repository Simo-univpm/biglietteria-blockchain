const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


const receiptSchema = new mongoose.Schema({

    Codice_ricevuta: {
        type: String,
        min: 1,
        max: 128,
        required: true
    },

    Metodo_di_pagamento: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    //shipping address

    Via: {
        type: String,
        min: 1,
        max: 64,
        required: true
    },

    Città: {
        type: String,
        min: 1,
        max: 64,
        required: true
    },

    Stato: {
        type: String,
        min: 1,
        max: 64,
        required: true
    },

    CAP: {
        type: String,
        min: 4,
        max: 16,
        required: true
    },


    //payer info

    Email: {
        type: String,
        min: 6,
        max: 64,
        required: true
    },

    Nome: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Cognome: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    //items

    eventID: {
        type: Number,
        min: 0,
        required: true
    },

    userID: {
        type: Number,
        min: 0,
        required: true
    },

    Prezzo: {
        type: Number,
        min: 1,
        max: 1000,
        required: true
    },

    Valuta: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Numero_biglietti: {
        type: Number,
        min: 1,
        max: 4,
        required: true
    },

    //date

    Data_emissione: {
        type: String,
        min: 8,
        max: 10
    },

    Orario_emissione: {
        type: String,
        min: 5,
        max: 5
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
receiptSchema.plugin(AutoIncrement,  {inc_field: 'receiptID'});

receiptSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['eventID','receiptID']});


module.exports = mongoose.model('Receipt', receiptSchema);