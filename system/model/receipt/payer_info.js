const mongoose = require('mongoose');

const payer_info_schema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    payer_id: {
        type: String,
        required: true
    }

});

module.exports = payer_info_schema;