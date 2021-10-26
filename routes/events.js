const router = require('express').Router();
const EventController = require('../controllers/EventController');
const eventController = new EventController();


var eventi={
    "Cinema":
    [
      {
        "immagine": "Cinema/id1.png",
        "nome": "No Time to Die",
        "luogo": "Multiplex Giometti Cinema Ancona",
        "data": "30/09/2021",
        "posti_disponibili": "102/207",
        "orario": "19:30",
        "organizzatore": "Multiplex Giometti",
        "prezzo": "9.00",
        "id": 1
      },
      {
        "immagine": "Cinema/id2.png",
        "nome": "Dune",
        "luogo": "Multiplex Giometti Cinema Ancona",
        "data": "16/09/2021",
        "posti_disponibili": "99/207",
        "orario": "21:00",
        "organizzatore": "Multiplex Giometti",
        "prezzo": "9.00",
        "id": 2
      },
      {
        "immagine": "Cinema/id3.png",
        "nome": "Space Jam: New Legends",
        "luogo": "Multiplex Giometti Cinema Ancona",
        "data": "23/09/2021",
        "posti_disponibili": "86/207",
        "orario": "20:25",
        "organizzatore": "Multiplex Giometti",
        "prezzo": "9.00",
        "id": 3 
      },
      {
        "immagine": "Cinema/id4.png",
        "nome": "Tre piani",
        "luogo": "Multiplex Giometti Cinema Ancona",
        "data": "23/09/2021",
        "posti_disponibili": "115/207",
        "orario": "22:40",
        "organizzatore": "Multiplex Giometti",
        "prezzo": "9.00",
        "id": 4 
      }
    ],
    "Concerti":
    [
      {
        "immagine": "Concerti/id1.png",
        "nome": "Ultimo",
        "luogo": "Stadio del Conero, Ancona",
        "data": "17/06/2022",
        "posti_disponibili": "1320/3000",
        "orario": "21:00",
        "organizzatore": "Vivo Concerti srl",
        "prezzo": "57.50",
        "id": 5
      },
      {
        "immagine": "Concerti/id2.png",
        "nome": "Marracash",
        "luogo": "Nelson Mandela Forum, Firenze",
        "data": "04/02/2022",
        "posti_disponibili": "2320/3200",
        "orario": "21:00",
        "organizzatore": "FRIENDS e PARTNERS S.P.A",
        "prezzo": "40.00",
        "id": 6
      },
      {
        "immagine": "Concerti/id3.png",
        "nome": "Modà",
        "luogo": "Palazzo Dello Sport, Roma",
        "data": "26/05/2022",
        "posti_disponibili": "420/1000",
        "orario": "21:00",
        "organizzatore": "FRIENDS e PARTNERS S.P.A.",
        "prezzo": "69.00",
        "id": 7
      },
      {
        "immagine": "Concerti/id4.png",
        "nome": "Gazzelle",
        "luogo": "Rock in Roma, Roma",
        "data": "22/07/2022",
        "posti_disponibili": "310/1000",
        "orario": "21:00",
        "organizzatore": "Vivo Concerti srl",
        "prezzo": "34.50",
        "id": 8
      },
      {
        "immagine": "Concerti/id5.png",
        "nome": "Ultimo",
        "luogo": "Stadio del Conero",
        "data": "17/06/2022",
        "posti_disponibili": "1320/3000",
        "orario": "21:00",
        "organizzatore": "Vivo Concerti srl",
        "prezzo": "57.50",
        "id": 9
      },
      {
        "immagine": "Concerti/id6.png",
        "nome": "Sfera Ebbasta",
        "luogo": "Nelson Mandela Forum, Firenze",
        "data": "28/04/2022",
        "posti_disponibili": "2410/3200",
        "orario": "21:00",
        "organizzatore": "TRIDENT MUSIC SRL",
        "prezzo": "69.00",
        "id": 10
      },
      {
        "immagine": "Concerti/id7.png",
        "nome": "Tommaso Paradiso",
        "luogo": "Nelson Mandela Forum, Firenze",
        "data": "29/03/2022",
        "posti_disponibili": "2180/3200",
        "orario": "21:00",
        "organizzatore": "Vivo Concerti srl",
        "prezzo": "63.25",
        "id": 11
      }
    ],
    "Musei":
    [
      {
        "immagine": "Musei/id1.png",
        "nome": "Museo + Planetario",
        "luogo": "Pino Torinese, Torino",
        "data": "09/10/2021",
        "posti_disponibili": "148/400",
        "orario": "00:00",
        "organizzatore": "Infini.to",
        "prezzo": "12.00",
        "id": 12
      },
      {
        "immagine": "Musei/id2.png",
        "nome": "Domus Romane",
        "luogo": "Palazzo Valentini, Roma",
        "data": "02/10/2021",
        "posti_disponibili": "232/600",
        "orario": "10:00",
        "organizzatore": "Palazzo Valentini",
        "prezzo": "13.50",
        "id": 13
      },
      {
        "immagine": "Musei/id3.png",
        "nome": "Galleria degli Uffizi",
        "luogo": "Galleria degli Uffizi, Firenze",
        "data": "02/10/2021",
        "posti_disponibili": "148/400",
        "orario": "08:15",
        "organizzatore": "Firenze Musei",
        "prezzo": "24.00",
        "id": 14
      }
    ],
    "Partite":
    [
      {
        "immagine": "Partite/id1.png",
        "nome": "Atalanta-Milan",
        "luogo": "Gewiss Stadium, Bergamo",
        "data": "3/10/2021",
        "posti_disponibili": "70/21.300",
        "orario": "20:45",
        "organizzatore": "Lega Serie A",
        "prezzo": "75.00",
        "id": 15
      },
      {
        "immagine": "Partite/id2.png",
        "nome": "Roma-Empoli",
        "luogo": "Stadio Olimpico, Roma",
        "data": "3/10/2021",
        "posti_disponibili": "52/ 72.698",
        "orario": "18:00",
        "organizzatore": "Lega Serie A",
        "prezzo": "62.00",
        "id": 16
      },
      {
        "immagine": "Partite/id3.png",
        "nome": "Torino-Juventus",
        "luogo": "Stadio Olimpico Grande Torino, Torino",
        "data": "2/10/2021",
        "posti_disponibili": "12/ 28.177",
        "orario": "18:00",
        "organizzatore": "Lega Serie A",
        "prezzo": "80.00",
        "id": 17
      },
      {
        "immagine": "Partite/id4.png",
        "nome": "Verona-Spezia",
        "luogo": "Stadio Marcantonio Bentegodi",
        "data": "3/10/2021",
        "posti_disponibili": "10151/39221",
        "orario": "15:00",
        "organizzatore": "Lega Serie A",
        "prezzo": "35.00",
        "id": 18
      },
      {
        "immagine": "Partite/id5.png",
        "nome": "Fiorentina-Napoli",
        "luogo": "Stadio Artemio Franchi, Firenze",
        "data": "3/10/2021",
        "posti_disponibili": "567/43.147",
        "orario": "18:00",
        "organizzatore": "Lega Serie A",
        "prezzo": "68.00",
        "id": 19
      }
    ],
    "Teatro":
    [
      {
        "immagine": "Teatro/id1.png",
        "nome": "Pio e Amedeo",
        "luogo": "Palazzo Dello Sport, Roma",
        "data": "5/04/2022",
        "posti_disponibili": "450/700",
        "orario": "21:00",
        "organizzatore": "FRIENDS e PARTNERS S.P.A.",
        "prezzo": "65.00",
        "id": 20
      },
      {
        "immagine": "Teatro/id2.png",
        "nome": "Andrea Pucci",
        "luogo": "Teatro Repower, Assago",
        "data": "10/01/2022",
        "posti_disponibili": "120/600",
        "orario": "21:00",
        "organizzatore": "AD MANAGEMENT SRL",
        "prezzo": "48.00",
        "id": 21
      },
      {
        "immagine": "Teatro/id3.png",
        "nome": "Giuseppe Giacobazzi",
        "luogo": "Teatro Brancaccio, Roma",
        "data": "01/12/2021",
        "posti_disponibili": "750/900",
        "orario": "20:45",
        "organizzatore": "Teatro Brancaccio",
        "prezzo": "39.00",
        "id": 22
      },
      {
        "immagine": "Teatro/id4.png",
        "nome": "Grease - Il Musical",
        "luogo": "Teatro Repower, Assago",
        "data": "19/02/2022",
        "posti_disponibili": "210/600",
        "orario": "20:45",
        "organizzatore": "Forumnet Spa",
        "prezzo": "52.00",
        "id": 23
      },
      {
        "immagine": "Teatro/id5.png",
        "nome": "Maurizio Battista",
        "luogo": "Teatro delle Muse, Ancona",
        "data": "07/12/2021",
        "posti_disponibili": "150/700",
        "orario": "21:00",
        "organizzatore": "SKYLINE SRL",
        "prezzo": "40.00",
        "id": 24
      },
      {
        "immagine": "Teatro/id6.png",
        "nome": "Virginia Raffaele in Samusa",
        "luogo": "Teatro Civico, La Spezia",
        "data": "20/10/2021",
        "posti_disponibili": "96/42000",
        "orario": "21:00",
        "organizzatore": "Ad Arte Spettacoli",
        "prezzo": "42.00",
        "id": 25
      }
    ]
}


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