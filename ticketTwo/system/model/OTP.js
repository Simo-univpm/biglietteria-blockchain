const mongoose = require('mongoose');
const Encryption = require('mongoose-encryption');

const OTPSchema = new mongoose.Schema({

    userID: {
        type: Number,
        required: true,
    },

    OTP: {
        type: String,
        required: true, 
    },

});

OTPSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID']});

module.exports = mongoose.model('OTP', OTPSchema);