const mongoose = require('mongoose');
const Encryption = require('mongoose-encryption');

// Questo è il formato dell'utente a db
const accessSchema = new mongoose.Schema({

    Mail: {
        type: String,
        min: 2,
        max: 128,
        required: true
    },
    
    Data_accesso: {
        type: String,
        required: true
    },

    Orario_accesso: {
        type: String,
        required: true
    }

});

accessSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512
});

module.exports = mongoose.model('Access', accessSchema);