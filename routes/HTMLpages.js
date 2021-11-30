const router = require('express').Router();



const Annullatore = require('../front end/annullatore')
const Staff_biglietteria = require('../front end/biglietteria')
const Cliente = require('../front end/cliente')
const Organizzatore_eventi = require('../front end/event manager')
const UtenteOspite = require('../front end/utente ospite')



const verifyToken = require('../system/middlewares').verifyToken;
const checkLogin = require('../system/middlewares').checkLogin;
const checkPrivileges = require('../system/middlewares').checkPrivileges;

const Controllers = require('../system/controllers')
const eventController = new Controllers.EventController();
const ticketController = new Controllers.TicketController();
const userController = new Controllers.UserController();



// Mappa la rotta della pagina iniziale (quella mostrata agli utenti non autenticati)

router.get('/', checkLogin, async (req, res) => {

  var result = await eventController.getEventByType(req.query.type);  //Ottiene la lista degli eventi per la categoria considerata
  new UtenteOspite.CatalogoEventi(result[1]).send(res) 
});



// Mappa la rotta della pagina per il login

router.get('/login', async (req, res) => new UtenteOspite.Login().send(res))



// Mappa la rotta della pagina per recuperare la password di un account

router.get('/recupera-password', async (req, res) => new UtenteOspite.RecuperaPassword().send(res)) //Crea una nuova pagina HTML e la invia al client




// Mappa la rotta della pagina per creare un nuovo account

router.get('/sign-in', async (req, res) => new UtenteOspite.Signin().send(res))


// Mappa la rotta della pagina per creare un nuovo evento

router.get('/new-event', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => new Organizzatore_eventi.CreaEvento(req.user.email).send(res))



// Mappa la rotta della pagina per modificare un evento esistente

router.get('/update-event', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);  //Ottiene i dati relativi all'evento cercato
  new Organizzatore_eventi.AggiornaEvento(req.user.email,result[1].toJSON()).send(res) //Crea una nuova pagina HTML (area riservata)
});


// Mappa la rotta della pagina per cancellare un evento 

router.get('/delete-event', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);  //Ottiene i dati relativi all'evento cercato
  new Organizzatore_eventi.CancellaEvento(req.user.email,result[1].toJSON()).send(res) //Crea una nuova pagina HTML (area riservata)
});



// Mappa la rotta della pagina in cui vengono visualizzati tutti gli utenti registrati al sito web

router.get('/users', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => {

  var result = await userController.getAllUsers();  //Ottiene la lista di tutti gli utenti registrati
  new Staff_biglietteria.ListaUtenti(req.user.email,result[1]).send(res)
});



// Mappa la rotta della pagina che permette di modificare i privilegi degli utenti

router.get('/grant-privileges', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => new Staff_biglietteria.ConcediPrivilegi(req.user.email).send(res))




// Mappa la rotta della pagina in cui sono mostrati tutti gli eventi disponibili sul sito

router.get('/eventi', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria"], next), async (req, res) => {

  var result = await eventController.getEventByType(req.query.type,req.user);  //Ottiene tutti gli eventi associati alla categoria specificata
  eval('new '+req.user.privileges.replace(" ","_")+'.CatalogoEventi(result[1],req.user.email).send(res)')
});


//Mappa la rotta della pagina in cui il cliente può acquistare i biglietti

router.get('/acquista', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Cliente"], next),  async (req, res) => {

  var result = await eventController.getEvent(req.query.id);  //Ottiene i dati relativi all'evento cercato
  new Cliente.AcquistaBiglietti(req.user.email,result[1]).send(res)
});

router.get('/mytickets', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => {

  var result = await ticketController.getTicketByUser(req.user.userID);
  new Cliente.ListaBiglietti(result[1],req.user.email).send(res)
});



// Mappa la rotta della pagina web in cui sono memorizzati i dati del profilo di un utente

router.get('/profilo', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next),async (req, res) => {

  var result = await userController.getUser(req.user.userID);
  eval('new '+req.user.privileges.replace(" ","_")+'.Profilo(result[1].toJSON()).send(res)')
});

router.get('/biglietti', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi","Staff biglietteria"], next), async (req, res) => {
    
  var result = await ticketController.getTicketByEvent(req.query.id);
  new Staff_biglietteria.ListaBiglietti(req.user.email,result[1]).send(res)
});


/*
*
* !!!NOTA!!! Queste sotto di rotte vanno sistemate....
*
*/


// Mappa la rotta della pagina web per scannerizzare i QRcode

router.get('/annulla-biglietti', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Annullatore"], next),async (req, res) => new Annullatore.InvalidaBiglietti().send(res));





router.get('/ingressi', async (req, res) => {
    
    res.send("!!!NOTA!!!! Inserire la pagina per vedere la lista degli ingressi") 
});




module.exports = router;