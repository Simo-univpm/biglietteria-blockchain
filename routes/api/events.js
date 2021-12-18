const router = require('express').Router();

const TicketTwo = require(process.env.TICKET_TWO)

const verifyToken = TicketTwo.System.Middlewares.verifyToken;
const verifyOTP = TicketTwo.System.Middlewares.verifyOTP;
const checkPrivileges = TicketTwo.System.Middlewares.checkPrivileges;

const eventController = new TicketTwo.System.Controllers.EventController();


//Facendo una richiesta POST a questa rotta un utente della biglietteria può aprire le vendite dei biglietti per un evento

router.patch('/apri-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  eventController.apriVendite(req.query.id,req.query.annullatore,req.headers.user.walletAddress,req.body.Password_wallet).then(result => res.status(result[0]).send(result[1]))
);


//Facendo una richiesta GET a questa rotta un utente della biglietteria può chiudere le vendite dei biglietti per un evento

router.patch('/chiudi-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  eventController.chiudiVendite(req.body.id,req.headers.user.walletAddress,req.body.Password_wallet).then(result => res.status(result[0]).send(result[1]))
);


// (POST) crea un nuovo evento
router.post('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => 

 eventController.createEvent(req.body,req.headers.user.Organizzatore).then(result => res.status(result[0]).send(result[1]))
);


// (PATCH) modifica i dati relativi ad un evento
router.patch('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) =>  eventController.updateEvent(req.body,req.body.id).then(result => res.status(result[0]).send(result[1])));


// (DELETE) elimina i dati relativi ad un evento
router.delete('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => eventController.deleteEvent(req.body.id).then(result => res.status(result[0]).send(result[1])));

module.exports = router;