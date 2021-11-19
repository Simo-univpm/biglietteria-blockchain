const router = require('express').Router();

const Paypal= require('../payments/paypal');
const paypal = new Paypal();

const EventController = require('../controllers/EventController');
const eventController = new EventController();

const verifyToken = require('../middlewares/verifyToken');
const checkPrivileges = require('../middlewares/checkPrivileges');

const TicketOffice = require('../payments/ticketOffice');
const biglietteria = new TicketOffice();

//Facendo una richiesta GET a questa rotta un utente della biglietteria può aprire le vendite dei biglietti per un evento

router.get('/apri-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, [2], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const evento = result[1]
  biglietteria.apriVendite(evento.nome,evento.luogo,"nessuno",evento.postiTotali,evento.data.split("/"),evento.orario.split(":"))
  res.redirect("/eventi?type=Cinema")
  
});

router.get('/call', async (req, res) => {
  const data = await biglietteria.call()
  res.send(data)
});

router.get('/', verifyToken, (req, res, next) => checkPrivileges(req, res, [0], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const evento = result[1]

  //!!!!!NOTA!!!!!!
  //Aggiungere chiamata allo smart contract per controllare la disponibilità dei biglietti
  //Se i biglietti ci sono richiedi il pagamento

  paypal.richiestaPagamento(res,evento.nome,evento.prezzo,req.query.numero_biglietti)
  
});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento a successo

router.get('/success', verifyToken, (req, res, next) => checkPrivileges(req, res, [0], next), async (req, res) => {

  paypal.eseguiPagamento(res,req.query.PayerID,req.query.paymentId)

  //!!!!!NOTA!!!!!!
  //Se il pagamento va a buon fine bisogna dare i biglietti al cliente
  //Aggiungere chiamata allo smart contract per emettere i biglietti

});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento fallisce

router.get('/cancel', verifyToken, (req, res, next) => checkPrivileges(req, res, [0], next), async (req, res) => res.send('Cancelled'));


module.exports = router;
