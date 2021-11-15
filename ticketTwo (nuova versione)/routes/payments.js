const router = require('express').Router();

const Paypal= require('../payments/paypal');
const paypal = new Paypal();

const EventController = require('../controllers/EventController');
const eventController = new EventController();

const SmartContract = require('../payments/smartContract');
const smartContract = new SmartContract();


router.get('/apri-vendite', async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const evento = result[1]
  smartContract.deploy(evento.nome,evento.luogo,"nessuno",evento.postiTotali,evento.data.split("/"),evento.orario.split(":"))
  res.redirect("/eventi?type=Cinema")
  
});

router.get('/call', async (req, res) => {
  const data = await smartContract.call()
  res.send(data)
});

router.get('/', async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const evento = result[1]
  paypal.richiestaPagamento(res,evento.nome,evento.prezzo,req.query.numero_biglietti)
  
});
  

router.get('/success', async (req, res) => {

  paypal.eseguiPagamento(res,req.query.PayerID,req.query.paymentId)
});


router.get('/cancel', async (req, res) => res.send('Cancelled'));


module.exports = router;
