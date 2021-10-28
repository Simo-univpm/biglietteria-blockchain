const router = require('express').Router();
const EventController = require('../controllers/EventController');
const eventController = new EventController();

/**
 * chiedi a giacomo per i biglietti come funziona
 * che mi sono dimenticato porco schifo
 */

var biglietti={
    "1": 
    [
      {
        "codice_identificativo": "497349749BEJBFWJEHJFB",
        "proprietario": "utente1@gmail.com",
        "data_emissione": "07-09-2021",
        "orario_emissione": "20:32",
        "orario_ingresso": "21:15"
      },
      {
        "codice_identificativo": "ADCBSF389478JCEBJFH",
        "proprietario": "utente2@alice.com",
        "data_emissione": "08-09-2021",
        "orario_emissione": "12:45",
        "orario_ingresso": "21:25"
      },
      {
        "codice_identificativo": "DEHFH447757BXJB3",
        "proprietario": "utente3@hotmail.com",
        "data_emissione": "27-09-2021",
        "orario_emissione": "14:16",
        "orario_ingresso": "21:12"
      }
    ],
    "2":
    [],
    "3":
    [],
    "4":
    [],
    "5":
    [],
    "6":
    [],
    "7":
    [],
    "8":
    [],
    "9":
    [],
    "10":
    [],
    "11":
    [],
    "12":
    [],
    "13":
    [],
    "14":
    [],
    "15":
    [],
    "16":
    [],
    "17":
    [],
    "18":
    [],
    "19":
    [],
    "20":
    [],
    "21":
    [],
    "22":
    [],
    "23":
    [],
    "24":
    [],
    "25":
    []
}


// (GET) ottieni tutti gli eventi
router.get('/', async (req, res) => {

  var result = await eventController.getAllEvents();
  res.status(result[0]).json(result[1]); // ritorna un json con tutti gli eventi ma non so se tutto stringa

});


// (GET) ottieni eventi per categoria
router.get('/:type', async (req, res) => {

  var result = await eventController.getEventByType(req.params.type);
  res.status(result[0]).json(result[1]);

});


// (GET) ottieni un evento specifico tramite id
router.get('/:eventID', async (req, res) => {
  
  var result = await eventController.getEvent(req.params.eventID);
  res.status(result[0]).json(result[1]);

});


// (POST) crea un nuovo evento
router.post('/', async (req, res) => {
  
  console.log(req.body)
  var result = await eventController.createEvent(req.body);
  res.status(result[0]).json(result[1]);

});

// (POST) crea un nuovo evento
router.post('/image', async (req, res) => {
  console.log(req.body)
  
  res.status(200).json("OK");

});


// (POST) biglietti
router.post('/biglietti', async (req, res) => {

    const id = req.body.id
    const biglietti_emessi=biglietti[id]
    res.status(200).json({id:id, biglietti_emessi:biglietti_emessi});

});




module.exports = router;