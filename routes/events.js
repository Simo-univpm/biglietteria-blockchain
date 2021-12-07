const router = require('express').Router();

const verifyToken = require('../system/middlewares').verifyToken;
const verifyOTP = require('../system/middlewares').verifyOTP;
const checkPrivileges = require('../system/middlewares').checkPrivileges;

const Controllers = require('../system/controllers')
const eventController = new Controllers.EventController();


//Facendo una richiesta POST a questa rotta un utente della biglietteria può aprire le vendite dei biglietti per un evento

router.post('/apri-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), verifyOTP, async (req, res) => {

  var result = await eventController.apriVendite(req.body.eventID,req.body.annullatore,req.user.WalletAddress);
  res.status(result[0]).send(result[1])
  
});

//Facendo una richiesta GET a questa rotta un utente della biglietteria può chiudere le vendite dei biglietti per un evento

router.get('/chiudi-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), verifyOTP, async (req, res) => {

  var result = await eventController.chiudiVendite(req.query.id);
  res.redirect("/eventi?type=Cinema")
  
});


// (POST) crea un nuovo evento
router.post('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => {

  req.body.Organizzatore = req.user.Organizzatore
  var result = await eventController.createEvent(req.body);
  res.status(result[0]).json(result[1]);

});


// (PATCH) modifica i dati relativi ad un evento
router.patch('/:eventID', async (req, res) => {

  var result = await eventController.updateEvent(req.body,req.params.eventID);
  res.status(result[0]).json(result[1]);

});


// (DELETE) elimina i dati relativi ad un evento
router.delete('/:eventID', async (req, res) => {

  var result = await eventController.deleteEvent(req.params.eventID);
  res.status(result[0]).json(result[1]);

});

module.exports = router;