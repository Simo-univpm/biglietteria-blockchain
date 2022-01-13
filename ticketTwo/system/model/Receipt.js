const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


const receiptSchema = new mongoose.Schema({

    Codice_ricevuta: {
        type: String,
        minlength: [1,"Il codice della ricevuta specificato non è valido"],
        maxlength: [128,"Il codice della ricevuta specificato non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Metodo_di_pagamento: {
        type: String,
        minlength: [1,"Il metodo di pagamento specificato non è valido"],
        maxlength: [24,"Il metodo di pagamento specificato non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    //shipping address

    Via: {
        type: String,
        minlength: [1,"Il nome specificato per la via è troppo corto"],
        maxlength: [40,"Il nome specificato per la via è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Città: {
        type: String,
        minlength: [1,"Il nome specificato per la città è troppo corto"],
        maxlength: [24,"Il nome specificato per la città è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Stato: {
        type: String,
        minlength: [1,"Il nome specificato per lo stato è troppo corto"],
        maxlength: [24,"Il nome specificato per lo stato è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    CAP: {
        type: String,
        minlength: [4,"Il CAP specificato è troppo corto"],
        maxlength: [16,"Il CAP specificato è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },


    //payer info

    Email: {
        type: String,
        minlength: [6,"L'email inserita è troppo corta"],
        maxlength: [64,"L'email inserita è troppo lunga"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Nome: {
        type: String,
        minlength: [1,"Il nome inserito è troppo corto"],
        maxlength: [24,"Il nome inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Cognome: {
        type: String,
        minlength: [1,"Il cognome inserito è troppo corto"],
        maxlength: [24,"Il cognome inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    //items

    eventID: {
        type: Number,
        min: [0,"Il campo eventID non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    userID: {
        type: Number,
        min: [0,"Il campo userID non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Prezzo: {
        type: Number,
        min: [1, "Il prezzo specificato è troppo basso"],
        max: [1000, "Il prezzo specificato è troppo alto"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Valuta: {
        type: String,
        minlength: [1,"La valuta specificata non è valida"],
        maxlength: [24,"La valuta specificata non è valida"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Numero_biglietti: {
        type: Number,
        min: [1, "Il numero di biglietti specificato è troppo basso"],
        max: [4, "Il numero di biglietti specificato è troppo alto"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    //date

    Data_emissione: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"]
    },

    Orario_emissione: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"]
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
receiptSchema.plugin(AutoIncrement,  {inc_field: 'receiptID'});

receiptSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['eventID','receiptID']});


module.exports = mongoose.model('Receipt', receiptSchema);