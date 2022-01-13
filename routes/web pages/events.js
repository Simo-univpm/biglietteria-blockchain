const router = require('express').Router();

const TicketTwo = require(process.env.TICKET_TWO)

const verifyToken = TicketTwo.System.Middlewares.verifyToken;
const checkLogin = TicketTwo.System.Middlewares.checkLogin;
const checkPrivileges = TicketTwo.System.Middlewares.checkPrivileges;

const eventController = new TicketTwo.System.Controllers.EventController();



// Mappa la rotta della pagina iniziale (quella mostrata agli utenti non autenticati)

router.get('/', checkLogin, async (req, res) => 

    eventController.getEventByType(req.query.type).then(result => new TicketTwo.UtenteOspite.CatalogoEventi(result[1]).send(res,result[0]))
);


// Mappa la rotta della pagina in cui sono mostrati tutti gli eventi disponibili sul sito

router.get('/eventi', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria"], next), async (req, res) => 

    eventController.getEventByType(req.query.type,req.headers.user)
      .then(result => eval('new TicketTwo.'+req.headers.user.privileges.replace(" ","_")+'.CatalogoEventi(result[1],req.headers.user.email).send(res,result[0])'))
);


// Mappa la rotta della pagina in cui il cliente può acquistare i biglietti

router.get('/acquista', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Cliente"], next),  async (req, res) => 

  eventController.getEvent(req.query.id,req.headers.user.privileges).then(result => new TicketTwo.Cliente.AcquistaBiglietti(req.headers.user.email,result[1]).send(res,result[0]))
);


// Mappa la rotta della pagina in cui un membro dello staff della biglietteria può aprire le vendite dei biglietti per un evento

router.get('/apri-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  new TicketTwo.Staff_biglietteria.ApriVendite(req.headers.user.email,req.query.id,req.query.annullatore).send(res)
);


// Mappa la rotta della pagina in cui un membro dello staff della biglietteria può chiudere le vendite dei biglietti per un evento

router.get('/chiudi-vendite', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 

  new TicketTwo.Staff_biglietteria.ChiudiVendite(req.headers.user.email,req.query.id).send(res)
);


// Mappa la rotta della pagina per creare un nuovo evento

router.get('/new-event', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => new TicketTwo.Organizzatore_eventi.CreaEvento(req.headers.user.email).send(res))


// Mappa la rotta della pagina per modificare un evento esistente

router.get('/update-event', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => eventController.getEvent(req.query.id,req.headers.user.privileges).then(result => new TicketTwo.Organizzatore_eventi.AggiornaEvento(req.headers.user.email,result[1]).send(res,result[0])));


// Mappa la rotta della pagina per cancellare un evento 

router.get('/delete-event', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi"], next), async (req, res) => eventController.getEvent(req.query.id,req.headers.user.privileges).then(result => new TicketTwo.Organizzatore_eventi.CancellaEvento(req.headers.user.email,result[1]).send(res,result[0])));


module.exports = router;