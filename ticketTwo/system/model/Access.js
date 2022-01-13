const mongoose = require('mongoose');
const Encryption = require('mongoose-encryption');

const accessSchema = new mongoose.Schema({

    Mail: {
        type: String,
        minlength: [6,"L'email inserita è troppo corta"],
        maxlength: [64,"L'email inserita è troppo lunga"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },
    
    Data_accesso: {
        type: String,
        minlength: [8,"La data inserita non è valida"],
        maxlength: [10,"La data inserita non è valida"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    },

    Orario_accesso: {
        type: String,
        minlength: [3,"L'orario inserito non è valido"],
        maxlength: [5,"L'orario inserito non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"]
    }

});

accessSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512
});

module.exports = mongoose.model('Access', accessSchema);