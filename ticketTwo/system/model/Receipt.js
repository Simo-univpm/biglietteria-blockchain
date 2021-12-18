const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


// Questo è il formato del biglietto a db
const receiptSchema = new mongoose.Schema({

    Codice_ricevuta: {
        type: String,
        required: true
    },

    Metodo_di_pagamento: {
        type: String,
        required: true
    },

    //shipping address

    Via: {
        type: String,
        required: true
    },

    Città: {
        type: String,
        required: true
    },

    Stato: {
        type: String,
        required: true
    },

    CAP: {
        type: String,
        required: true
    },


    //payer info

    Email: {
        type: String,
        required: true
    },

    Nome: {
        type: String,
        required: true
    },

    Cognome: {
        type: String,
        required: true
    },

    //items

    eventID: {
        type: Number,
        required: true
    },

    userID: {
        type: Number,
        required: true
    },

    Prezzo: {
        type: Number,
        required: true
    },

    Valuta: {
        type: String,
        required: true
    },

    Numero_biglietti: {
        type: Number,
        required: true
    },

    //date

    Data_emissione: {
        type: String,
    },

    Orario_emissione: {
        type: String,
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
receiptSchema.plugin(AutoIncrement,  {inc_field: 'receiptID'});

receiptSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['eventID','receiptID']});


module.exports = mongoose.model('Receipt', receiptSchema);