const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Encryption = require('mongoose-encryption');

const payer_info = require('./payer_info');
const shipping_address = require('./shipping_address');
const items = require('./items');


// Questo è il formato del biglietto a db
const receiptSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },

    payment_method: {
        type: String,
        required: true
    },

    payer_info: {
        type: payer_info,
        required: true
    },

    shipping_address: {
        type: shipping_address,
        required: true
    },

    items: {
        type: items,
        required: true
    },

    registerDate: {
        type: String,
    },

    registerTime: {
        type: String,
    }

});


// Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
receiptSchema.plugin(AutoIncrement,  {inc_field: 'receiptID'});

receiptSchema.plugin(Encryption, {
    encryptionKey: process.env.AES_256_CBC,
    signingKey: process.env.HMAC_SHA_512,
    excludeFromEncryption: ['eventID','receiptID']});


module.exports = mongoose.model('Receipt', receiptSchema);