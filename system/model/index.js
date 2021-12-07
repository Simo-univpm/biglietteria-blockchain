const User = require('./user');
const Event = require('./event');
const Ticket = require('./ticket');
const OTP = require('./OTP');
const Receipt = require('./receipt/Receipt');

module.exports = {
    User: User,
    Event: Event,
    OTP: OTP,
    Ticket: Ticket,
    Receipt: Receipt
}