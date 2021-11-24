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

router.get('/apri-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const evento = result[1]
  biglietteria.apriVendite(evento.Nome,evento.Luogo,"nessuno",evento.Posti_totali,evento.Data_evento.split("/"),evento.Orario.split(":"))
  res.redirect("/eventi?type=Cinema")
  
});

router.get('/call', async (req, res) => {
  const data = await biglietteria.call()
  res.send(data)
});

router.get('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const evento = result[1]

  paypal.richiestaPagamento(res,evento.Nome,evento.Prezzo,req.query.numero_biglietti)

  //!!!!!NOTA!!!!!!
  //Aggiungere chiamata allo smart contract per controllare la disponibilità dei biglietti
  //Se i biglietti ci sono richiedi il pagamento
  
});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento a successo

router.get('/success', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  paypal.eseguiPagamento(res,req.query.PayerID,req.query.paymentId)

  res.send("success")

  //!!!!!NOTA!!!!!!
  //Se il pagamento va a buon fine bisogna dare i biglietti al cliente
  //Aggiungere chiamata allo smart contract per emettere i biglietti

});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento fallisce

router.get('/cancel', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => res.send('Cancelled'));

router.get('/prova', async (req, res) => {
  const prova = await biglietteria.emettiBiglietti()
  const result = await biglietteria.invalidaBiglietto(prova.replace("data:image/png;base64",""))
  res.send(result)
});



module.exports = router;