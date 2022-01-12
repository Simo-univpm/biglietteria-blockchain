const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');

// Questo è il formato dell'utente a db
const userSchema = new mongoose.Schema({

    Privilegi: {
        type: String,
        enum : ['Cliente','Organizzatore eventi', 'Staff biglietteria', 'Annullatore'],
        default: "Cliente",
        required: true
    },

    organizzatore: {
        type: String,
        min: 1,
        max: 24,
        required: false,
    },

    Nome: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Telefono: {
        type: String,
        min: 10,
        max: 15,
        required: true
    },

    Cognome: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    Data_di_nascita: {
        type: String,
        min: 8,
        max: 10,
        required: true
    },

    Genere: {
        type: String,
        enum : ['Donna','Uomo', 'Altro'],
        min: 4,
        max: 5,
        required: true
    },

    Mail: {
        type: String,
        min: 6,
        max: 64,
        required: true
    },

    // user -> form
    Password: {
        type: String,
        min: 8,
        max: 64,
        required: true
    },
    
    // user -> form
    Indirizzo_wallet: {
        type: String,
        min: 1,
        max: 128,
        required: true 
    },
    
    registerDate: {
        type: String,
        min: 8,
        max: 10
    },

    registerTime: {
        type: String,
        min: 5,
        max: 5  
    }

});


// Campo userID, questo plugin permette di effettuarne l'auto incremento dell'id ogni volta che viene creato un nuovo utente
userSchema.plugin(AutoIncrement,  {inc_field: 'userID'});
userSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID','Mail']});

module.exports = mongoose.model('User', userSchema);