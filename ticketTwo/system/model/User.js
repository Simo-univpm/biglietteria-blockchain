const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');

// Questo è il formato dell'utente a db
const userSchema = new mongoose.Schema({

    Privilegi: {
        type: String,
        default: "Cliente",
        required: true
    },

    organizzatore: {
        type: String,
        required: false,
    },

    // user -> form
    Nome: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

     // tel -> form
    Telefono: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    // user -> form
    Cognome: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    // user -> form
    Data_di_nascita: {
        type: String,
        min: 8,
        max: 10,
        required: true
    },

    // user -> form
    Genere: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    // user -> form
    Mail: {
        type: String,
        min: 2,
        max: 128,
        required: true
    },

    // user -> form
    Password: {
        type: String,
        min: 8,
        max: 512,
        required: true
    },

    Organizzatore: {
        type: String,
        min: 2,
        max: 24,
        required: false
    },

    // user -> form
    Indirizzo_wallet: {
        type: String,
        min: 8,
        max: 512,
        required: true 
    },
    
    // auto
    registerDate: {
        type: String,
    },

    // auto
    registerTime: {
        type: String,
    }

});


// Campo userID, questo plugin permette di effettuarne l'auto incremento dell'id ogni volta che viene creato un nuovo utente
userSchema.plugin(AutoIncrement,  {inc_field: 'userID'});
userSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID','Mail']});

module.exports = mongoose.model('User', userSchema);