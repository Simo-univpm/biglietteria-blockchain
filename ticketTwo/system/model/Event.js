const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');


// Questo è il formato dell'evento a db
const eventSchema = new mongoose.Schema({
    
    // cinema, teatro e quant'altro
    type: {
        type: String,
        enum : {values: ['Cinema','Teatro', 'Musei', 'Partite', 'Concerti'], message: "Il tipo di evento specificato non è valido"},
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    stato: {
        type: Number,
        enum : {values: [0, 1, 2], message: "Lo stato dell'evento non è valido"},
        default: 0,
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    // percorso del file immagine della locandina
    Icona_evento: {
        type: String,
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Nome: {
        type: String,
        minlength: [1,"Il nome inserito è troppo corto"],
        maxlength: [24,"Il nome inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Luogo: {
        type: String,
        minlength: [1,"Il luogo inserito è troppo corto"],
        maxlength: [100,"Il luogo inserito è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Data_evento: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Posti_totali: {
        type: Number,
        min: [1, "Il numero di posti specificato è troppo basso"],
        max: [114000, "Il numero di posti specificato è troppo alto"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Posti_disponibili: {
        type: Number,
        min: [1, "Il numero di posti specificato è troppo basso"],
        max: [114000, "Il numero di posti specificato è troppo alto"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Orario: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Organizzatore: {
        type: String,
        minlength: [1,"Il nome inserito per l'organizzatore è troppo corto"],
        maxlength: [24,"Il nome inserito per l'organizzatore è troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Artisti: {
        type: String,
        minlength: [1,"Il campo artisti troppo corto"],
        maxlength: [128,"Il campo artisti troppo lungo"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Prezzo: {
        type: Number,
        min: [1, "Il prezzo specificato è troppo basso"],
        max: [1000, "Il prezzo specificato è troppo alto"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },
   
    eventCreationDate: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"]
    },

    eventCreationTime: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"] 
    },

    ContractAbi: {
        type: String,
        required: false
    },

    Indirizzo_contratto: {
        type: String,
        minlength: [1,"L'indirizzo dello smart contract inserito è troppo corto"],
        maxlength: [128,"L'indirizzo dello smart contract inserito è troppo lungo"],
        required: false
    },

    WalletAutomaticTicketOffice: {
        type: String,
        minlength: [1,"L'indirizzo del wallet inserito è troppo corto"],
        maxlength: [128,"L'indirizzo del wallet inserito è troppo lungo"],
        required: false
    },

    PasswordAutomaticTicketOffice: {
        type: String,
        minlength: [1,"L'indirizzo del wallet inserito è troppo corto"],
        maxlength: [128,"L'indirizzo del wallet inserito è troppo lungo"],
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