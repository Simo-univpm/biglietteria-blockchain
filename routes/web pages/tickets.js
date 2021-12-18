const router = require('express').Router();

const TicketTwo = require(process.env.TICKET_TWO)

const verifyToken = TicketTwo.System.Middlewares.verifyToken;
const verifyOTP = TicketTwo.System.Middlewares.verifyOTP;
const checkPrivileges = TicketTwo.System.Middlewares.checkPrivileges;

const receiptController = new TicketTwo.System.Controllers.ReceiptController();
const ticketController = new TicketTwo.System.Controllers.TicketController();



// Mappa la rotta della pagina in cui il cliente può vedere i biglietti acquistati

router.get('/mytickets', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), verifyOTP, async (req, res) => 

  ticketController.getTicketsByUser(req.headers.user.userID).then(result => new TicketTwo.Cliente.ListaBiglietti(result[1],req.headers.user.email).send(res,result[0]))
);


// Mappa la rotta della pagina web in cui viene visualizzato l'elenco di tutti i biglietti emessi per un evento

router.get('/biglietti', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi","Staff biglietteria"], next), async (req, res) => 
    
  ticketController.getTicketsByEvent(req.query.id).then(result => eval('new TicketTwo.'+req.headers.user.privileges.replace(" ","_")+'.ListaBiglietti(req.headers.user.email,result[1]).send(res,result[0])'))
);


// Mappa la rotta della pagina web in cui viene visualizzato l'elenco di tutti gli ingressi ad un evento

router.get('/ingressi', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Organizzatore eventi","Staff biglietteria"], next), async (req, res) => 
    
  ticketController.getInvalidatedTicketsByEvent(req.query.id).then(result => eval('new TicketTwo.'+req.headers.user.privileges.replace(" ","_")+'.ListaIngressi(req.headers.user.email,result[1]).send(res,result[0])'))
);


// Mappa la rotta della pagina web in cui viene visualizzato l'elenco di tutte le ricevute emesse per un evento

router.get('/ricevute', verifyToken,(req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => 
    
  receiptController.getReceiptsByEvent(req.query.id).then(result => new TicketTwo.Staff_biglietteria.ListaRicevute(req.headers.user.email,result[1]).send(res,result[0]))
);


// Mappa la rotta della pagina web per scannerizzare i QRcode

router.get('/annulla-biglietti', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Annullatore"], next),async (req, res) => new TicketTwo.Annullatore.InvalidaBiglietti().send(res,result[0]));


// (GET) download biglietto
router.get('/download', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente"], next), async (req, res) => 

  ticketController.getTicket(req.headers.user.userID,req.query.id).then(result => new TicketTwo.Cliente.Ticket(result[1]).send(res,result[0]))
);

module.exports = router;