const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Questo è il formato dell'utente a db
const userSchema = new mongoose.Schema({

    /**
     * utente normale = 0
     * eventManager = 1
     * biglietteria = 2 -> controlla differenze con annullatore
     * annullatore = 3 -> controlla differenze con biglietteria
     */
    privileges: {
        type: Number,
        default: 0,
        required: true
    },

    // user -> form
    name: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

     // tel -> form
    tel: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    // user -> form
    surname: {
        type: String,
        min: 2,
        max: 24,
        required: true
    },

    // user -> form
    dateOfBirth: {
        type: String,
        min: 8,
        max: 10,
        required: true
    },

    // user -> form
    gender: {
        type: String,
        min: 1,
        max: 24,
        required: true
    },

    // user -> form
    email: {
        type: String,
        min: 2,
        max: 128,
        required: true
    },

    // user -> form
    password: {
        type: String,
        min: 8,
        max: 512,
        required: true
    },

    // user -> form
    wallet: {
        type: String,
        min: 8,
        max: 512,
        required: false // TODO: da mettere a true quando funzioneranno le cose
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


module.exports = mongoose.model('User', userSchema);