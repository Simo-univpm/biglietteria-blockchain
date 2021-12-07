const router = require('express').Router();

const verifyToken = require('../system/middlewares').verifyToken;
const verifyOTP = require('../system/middlewares').verifyOTP;
const checkPrivileges = require('../system/middlewares').checkPrivileges;

const Paypal= require('../front end/sistema di pagamento');
const paypal = new Paypal();

const PDFTicket = require('../front end/Cliente/PDFTicket')


const Controllers = require('../system/controllers')
const eventController = new Controllers.EventController();
const ticketController = new Controllers.TicketController();
const receiptController = new Controllers.ReceiptController();





router.get('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  paypal.richiestaPagamento(res,req.user.userID,result[1].eventID,result[1].Prezzo,req.query.numero_biglietti)

  //!!!!!NOTA!!!!!!
  //Aggiungere chiamata allo smart contract per controllare la disponibilità dei biglietti
  //Se i biglietti ci sono richiedi il pagamento
  
});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento a successo

router.get('/success', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  const ricevuta = await paypal.eseguiPagamento(res,req.query.PayerID,req.query.paymentId)
  const eventData = JSON.parse(ricevuta.transactions[0].item_list.items[0].name)
  const numero_biglietti = ricevuta.transactions[0].item_list.items[0].quantity

  for (let i=0; i<numero_biglietti; i+=1)
    ticketController.createTicket(eventData.userID,eventData.eventID)

    
  var result = await receiptController.createReceipt(ricevuta,req.user.email);
  res.redirect("/eventi?type=Cinema")

});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento fallisce

router.get('/cancel', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => res.redirect("/"));


// (POST) crea un biglietto
router.post('/:eventID', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  var result = await ticketController.createTicket(req.user.userID, req.params.eventID);
  res.status(result[0]).send(result[1]);

});


// chiamata di prova
// (POST) crea un biglietto
router.post('/:eventID', verifyToken, async (req, res) => {

  var result = await ticketController.createTicket(req.user.userID, req.params.eventID);
  res.status(result[0]).send(result[1]);

});



// (POST) invalida un biglietto passato come parametro
router.patch('/invalida', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Annullatore"], next), async (req, res) => {

    /*var result = await ticketController.invalidaBiglietto(req.body);
    res.status(result[0]).send(result[1]);*/
    console.log(req.body)
    res.status(200).send(req.body)
  
});


// (GET) download biglietto
router.get('/download', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), verifyOTP, async (req, res) => {

  var result = await ticketController.getTicket(req.user.userID,req.query.id);
  
  const ticket = new PDFTicket(result[1]).get()
  const pdf = await ticketController.downloadTicket(ticket);
  res.set('Content-disposition', 'filename=My Ticket');
  res.set('Content-Type', 'application/pdf');
  res.send(pdf)

});



module.exports = router;