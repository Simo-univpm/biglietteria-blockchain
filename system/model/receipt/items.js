const mongoose = require('mongoose');

const items_schema = new mongoose.Schema({

    eventID: {
        type: Number, // se da problemi mettere a string
        required: true
    },

    userID: {
        type: Number, // se da problemi mettere a string
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }

});

module.exports = items_schema;