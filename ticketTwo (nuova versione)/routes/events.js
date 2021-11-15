const router = require('express').Router();
const express = require('express')

const EventController = require('../controllers/EventController');
const eventController = new EventController();

const fs = require('fs')
const path = require('path')

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


// (POST) crea un nuovo evento
router.post('/', async (req, res) => {
  fs.writeFileSync(path.dirname(__dirname)+"/icone eventi/immagine.png",req.body.immagine.replace("data:image/png;base64,",""),'base64');
  var result = await eventController.createEvent(req.body);
  res.status(result[0]).json(result[1]);

});

module.exports = router;