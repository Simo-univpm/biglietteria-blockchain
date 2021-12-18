const router = require('express').Router();

const TicketTwo = require(process.env.TICKET_TWO)

const verifyToken = TicketTwo.System.Middlewares.verifyToken;
const verifyOTP = TicketTwo.System.Middlewares.verifyOTP;
const checkPrivileges = TicketTwo.System.Middlewares.checkPrivileges;

const userController = new TicketTwo.System.Controllers.UserController();

// Mappa la rotta della pagina web in cui sono memorizzati i dati del profilo di un utente

router.get('/profilo', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next),async (req, res) => {

  userController.getUser(req.headers.user.userID).then(result => eval('new TicketTwo.'+req.headers.user.privileges.replace(" ","_")+'.Profilo(req.headers.user.email,result[1]).send(res,result[0])'))
});


// Mappa la rotta della pagina per creare un nuovo account

router.get('/sign-in', async (req, res) => new TicketTwo.UtenteOspite.Signin().send(res))


// Mappa la rotta della pagina per recuperare la password di un account

router.get('/recupera-password', async (req, res) => new TicketTwo.UtenteOspite.RecuperaPassword().send(res)) //Crea una nuova pagina HTML e la invia al client


// Mappa la rotta della pagina web in cui un utente può modificare la propria password

router.get('/modifica-password', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next), async (req, res) => eval('new TicketTwo.'+req.headers.user.privileges.replace(" ","_")+'.ModificaPassword(req.headers.user.email).send(res)'));


// Mappa la rotta della pagina che permette di modificare i privilegi degli utenti

router.get('/grant-privileges', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => new TicketTwo.Staff_biglietteria.ConcediPrivilegi(req.headers.user.email).send(res))


// Mappa la rotta della pagina in cui vengono visualizzati tutti gli utenti registrati al sito web

router.get('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  userController.getAllUsers().then(result => new TicketTwo.Staff_biglietteria.ListaUtenti(req.headers.user.email,result[1]).send(res,result[0]))
);


// Mappa la rotta della pagina in cui vengono visualizzati tutti gli annullatori registrati al sito web

router.get('/annullatori', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  userController.getAnnullatori().then(result => new TicketTwo.Staff_biglietteria.ListaAnnullatori(req.headers.user.email,req.query.id,result[1]).send(res,result[0]))
);


// Mappa la rotta della pagina in cui vengono visualizzati tutti gli accessi al sito web

router.get('/accessi', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  userController.getAllAccess().then(result => new TicketTwo.Staff_biglietteria.ListaAccessi(req.headers.user.email,result[1]).send(res,result[0]))
);


module.exports = router;