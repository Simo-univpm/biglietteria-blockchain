const mongoose = require('mongoose');

const shipping_address_schema = new mongoose.Schema({

    recipient_name: {
        type: String,
        required: true
    },

    line1: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    postal_code: {
        type: String,
        required: true
    },

    country_code: {
        type: String,
        required: true
    }

});

module.exports = shipping_address_schema;