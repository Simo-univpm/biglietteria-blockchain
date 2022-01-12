const mongoose = require('mongoose');
const Encryption = require('mongoose-encryption');

const OTPSchema = new mongoose.Schema({

    userID: {
        type: Number,
        min: 0,
        required: true,
    },

    OTP: {
        type: String,
        min: 4,
        max: 4,
        required: true, 
    },

});

OTPSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID']});

module.exports = mongoose.model('OTP', OTPSchema);