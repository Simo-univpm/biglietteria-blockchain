const mongoose = require('mongoose');
const Encryption = require('mongoose-encryption');

const OTPSchema = new mongoose.Schema({

    userID: {
        type: Number,
        min: [0,"Il campo userID non è valido"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"],
    },

    OTP: {
        type: String,
        minlength: [4,"Il codice OTP deve avere 4 cifre"],
        maxlength: [4,"Il codice OTP deve avere 4 cifre"],
        required: [true, "Non tutti i campi obbligatori sono stati compilati"], 
    },

});

OTPSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['userID']});

module.exports = mongoose.model('OTP', OTPSchema);