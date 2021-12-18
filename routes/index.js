
module.exports = {
    '/api/users': require('./api/users'),
    '/api/events': require('./api/events'),
    '/api/tickets': require('./api/tickets'),
    '/users': require('./web pages/users'),
    '/': require('./web pages/events'),
    '/tickets': require('./web pages/tickets'),
    '/stili': require('../ticketTwo/front end').CSS,
    '/images': require('../ticketTwo/front end').Immagini,
    '/scripts': require('../ticketTwo/front end').Scripts
}