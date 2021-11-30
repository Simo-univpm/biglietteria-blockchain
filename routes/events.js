const router = require('express').Router();

const verifyToken = require('../system/middlewares').verifyToken;
const checkPrivileges = require('../system/middlewares').checkPrivileges;

const Controllers = require('../system/controllers')
const eventController = new Controllers.EventController();


//Facendo una richiesta GET a questa rotta un utente della biglietteria può aprire le vendite dei biglietti per un evento

router.get('/apri-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => {

  var result = await eventController.apriVendite(req.query.id);
  res.redirect("/eventi?type=Cinema")
  
});

//Facendo una richiesta GET a questa rotta un utente della biglietteria può chiudere le vendite dei biglietti per un evento

router.get('/chiudi-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => {

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

module.exports = router;