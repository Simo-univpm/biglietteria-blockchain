const router = require('express').Router();
const express = require('express')

const EventController = require('../controllers/EventController');
const eventController = new EventController();

const verifyToken = require('../middlewares/verifyToken');
const checkPrivileges = require('../middlewares/checkPrivileges');


// (GET) ottieni tutti gli eventi
router.get('/', async (req, res) => {

  var result = await eventController.getAllEvents();
  res.status(result[0]).json(result[1]); // ritorna un json con tutti gli eventi ma non so se tutto stringa

});


// (GET) ottieni un evento specifico tramite id
router.get('/:eventID', async (req, res) => {
  
  var result = await eventController.getEvent(req.params.eventID);
  res.status(result[0]).json(result[1]);

});

// (GET) ottieni eventi di un organizzatore
router.get('/:organizzatore', async (req, res) => {
  
  var result = await eventController.getEventByOrganizzatore(req.params.organizzatore);
  res.status(result[0]).json(result[1]);

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