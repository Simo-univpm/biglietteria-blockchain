const router = require('express').Router();

const TicketTwo = require(process.env.TICKET_TWO)

const verifyToken = TicketTwo.System.Middlewares.verifyToken;
const checkPrivileges = TicketTwo.System.Middlewares.checkPrivileges;

const ticketController = new TicketTwo.System.Controllers.TicketController();


router.post('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  ticketController.richiestaBiglietto(req.body.metodo_pagamento,req.headers.user.userID,req.body.id,req.body.numero_biglietti,req.headers.user.walletAddress,req.body.Password_wallet).then(result => res.status(result[0]).send(result[1]))
});

//Il client viene reindirizzato a questa rotta quando la sua richiesta di pagamento a successo

router.get('/emetti-biglietti', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => 

ticketController.emissioneBiglietti(req.query.PayerID, req.query.paymentId, req.headers.user.email, req.headers.user.userID, req.headers.user.walletAddress).then(result => result[0] == 200 ? res.redirect("/eventi?type=Cinema") : res.status(result[0]).send(result[1]))
);


// (POST) invalida un biglietto passato come parametro
router.patch('/invalida', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Annullatore"], next), async (req, res) => 

ticketController.invalidaBiglietto(req.body.ticket, req.headers.user.walletAddress, req.body.password).then(result => res.status(result[0]).send(result[1]))
);


module.exports = router;