const mongoose = require('mongoose');
const Encryption = require('mongoose-encryption');

const accessSchema = new mongoose.Schema({

    Mail: {
        type: String,
        min: 6,
        max: 56,
        required: true
    },
    
    Data_accesso: {
        type: String,
        min: 8,
        max: 10,
        required: true
    },

    Orario_accesso: {
        type: String,
        min: 5,
        max: 8,
        required: true
    }

});

accessSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512
});

module.exports = mongoose.model('Access', accessSchema);