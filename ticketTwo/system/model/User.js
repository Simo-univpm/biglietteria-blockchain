const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');

// Questo è il formato dell'utente a db
const userSchema = new mongoose.Schema({

    Privilegi: {
        type: String,
        enum : {values: ['Cliente','Organizzatore eventi', 'Staff biglietteria', 'Annullatore'], message: "I privilegi specificati non sono validi"},
        default: "Cliente",
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Organizzatore: {
        type: String,
        minlength: [1,"Il nome inserito per l'organizzatore è troppo corto"],
        maxlength: [24,"Il nome inserito per l'organizzatore è troppo lungo"],
        required: false,
    },

    Nome: {
        type: String,
        minlength: [1,"Il nome inserito è troppo corto"],
        maxlength: [24,"Il nome inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Telefono: {
        type: String,
        minlength: [10,"Il numero di telefono inserito è troppo corto"],
        maxlength: [15,"Il numero di telefono inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Cognome: {
        type: String,
        minlength: [1,"Il cognome inserito è troppo corto"],
        maxlength: [24,"Il cognome inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Data_di_nascita: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Genere: {
        type: String,
        enum : {values: ['Donna','Uomo', 'Altro'], message: "Il genere specificato non è valido"},
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Mail: {
        type: String,
        minlength: [6,"L'email inserita è troppo corta"],
        maxlength: [64,"L'email inserita è troppo lunga"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    // user -> form
    // Attenzione! Non viene salvata la password ma il suo hash
    
    Password: {
        type: String,
        minlength: [1,"L'hash della password non è valido"],
        maxlength: [100,"L'hash della password non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },
    
    // user -> form
    Indirizzo_wallet: {
        type: String,
        minlength: [1,"L'indirizzo del wallet inserito è troppo corto"],
        maxlength: [128,"L'indirizzo del wallet inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"] 
    },
    
    registerDate: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"]
    },

    registerTime: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"]
    }

});


// Campo userID, questo plugin permette di effettuarne l'auto incremento dell'id ogni volta che viene creato un nuovo utente
userSchema.plugin(AutoIncrement,  {inc_field: 'userID'});
userSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID','Mail']});

module.exports = mongoose.model('User', userSchema);