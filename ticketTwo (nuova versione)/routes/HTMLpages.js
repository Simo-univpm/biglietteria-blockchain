const router = require('express').Router();

const HTMLpage = require("../front end/HTMLpage")
const Bar = require("../front end/bar")
const Login = require("../front end/login")
const Form = require("../front end/form")
const ListaEventi = require("../front end/listaEventi")
const Event = require("../front end/event")
const Table = require("../front end/table");
const Widget = require('../front end/widget');

var Captcha = require("nodejs-captcha");

const verifyToken = require('../middlewares/verifyToken');
const getToken = require('../middlewares/getToken');
const checkPrivileges = require('../middlewares/checkPrivileges');

const EventController = require('../controllers/EventController');
const eventController = new EventController();

const UserController = require('../controllers/UserController');
const userController = new UserController();



// Mappa la rotta della pagina iniziale

router.get('/', async (req, res) => {

    const token = getToken(req)

    let type = req.query.type

    if (type==undefined)
      type = "Cinema"

    if (! token){
      var result = await eventController.getEventByType(type);
      const home_page = new HTMLpage()
      const bar = new Bar(home_page.body)
      bar.addItem("Accedi","window.location.href='/login'")
      bar.addItem("Registrati","window.location.href='/sign-in'")
      home_page.addChild(bar)
      home_page.addChild(new ListaEventi(result[1],null))
      home_page.send(res)
    }
    else
      res.redirect("/eventi?type="+type)
    
});

// Mappa la rotta di login

router.get('/login', async (req, res) => {

  const login_page = new HTMLpage()
  login_page.setBackground("LogIn.png")
  login_page.addChild(new Login())
  login_page.send(res)
  
});

// Mappa la rotta della pagina per recuperare la password di un account

router.get('/recupera-password', async (req, res) => {

    const login_page = new HTMLpage()
    login_page.setBackground("LogIn.png")
    const form = new Form("/")
    form.setProperty("margin-top","10%") /*Distanza della finestra di login dall'alto*/
    form.setProperty("margin-left","60%") /*Distanza della finestra di login da sinistra*/
    form.setProperty("padding-bottom","40px") /*Spazio in basso alla finestra*/
    form.setProperty("width","340px") /*Lunghezza della finestra di login*/

    const label = new Widget("p","Inserendo i propri dati si riceverà una mail contenente le istruzioni per recuperare la password")
    label.setProperty("text-align","center");
    label.setProperty("color","rgb(133, 127, 127)");
    label.setProperty("margin-bottom","20px"); 
    form.addChild(label)

    form.addField("name","Nome")
    form.addField("surname","Cognome")
    form.addField("email","E-mail","email")

    const button = form.addButton("Avanti")
    button.setProperty("margin-top","10%")
    button.setProperty("background-color","rgba(24,119,242,255)")
    
    login_page.addChild(form)
    login_page.send(res)
  
});

// Mappa la rotta della pagina per la registrazione

router.get('/sign-in', async (req, res) => {

    const signin_page = new HTMLpage()
    signin_page.setBackground("SignIn.png")
    const form = new Form("'javascript: signin()'")
    form.addField("name","Nome")
    form.addField("surname","Cognome")
    form.addField("email","E-mail","email")
    form.addField("tel","Telefono","tel")
    form.addField("dateOfBirth","'Data di nascita'","date")
    const radio_buttons = form.addRadioButtons("gender",["Donna","Uomo","Altro"])
    radio_buttons.setProperty("margin-left","172px") /*Distanza del contenitore dei radio buttons dal bordo sinistro*/
    form.addField("password","Password","password")
    const conferma_password = form.addField("conferma_password","'Conferma password'","password")
    conferma_password.setAttribute("onchange","confermaPassword(this)")
    form.addInfoMessage("I dati inseriti non sono validi").setProperty("margin-left","36%") /*Distanza da sinistra*/
    form.addButton("Registrati")
    signin_page.addChild(form)
    signin_page.send(res)
    
});

// Mappa la rotta della pagina per creare un nuovo evento

router.get('/new-event', verifyToken, (req, res, next) => checkPrivileges(req, res, [1], next), async (req, res) => {

    const new_event_page = new HTMLpage(req.user)
    new_event_page.setBackground("NewEvent.png")
    const form = new Form("'javascript: createEvent()'")
    form.addField("nome","Nome")
    form.addField("luogo","Luogo")
    form.addField("data","'Data evento'","date")
    form.addField("orario","Orario","time")
    form.addField("postiTotali","'Posti Totali'","number")
    form.addField("immagine","'Carica una foto da utilizzare come copertina'","file")
    form.addField("prezzo","Prezzo","number")
    const radio_buttons = form.addRadioButtons("event_type",["Cinema","Concerti","Musei","Partite","Teatro"])
    radio_buttons.setProperty("margin-left","42px") /*Distanza del contenitore dei radio buttons dal bordo sinistro*/
    form.addInfoMessage("I dati inseriti non sono validi").setProperty("margin-left","36%") /*Distanza da sinistra*/
    form.addButton("'Crea evento'")
    new_event_page.addChild(form)
    new_event_page.send(res)
    
});

// (GET) ottieni tutti gli utenti registrati
router.get('/users', verifyToken, (req, res, next) => checkPrivileges(req, res, [2], next), async (req, res) => {

  const users_page = new HTMLpage(req.user)
  var result = await userController.getAllUsers();
  
  const tabella = new Table("Utenti registrati a ticketTwo")
  const valori = result[1]
 
  const campi = ["Nome","Cognome","Privilegi","Telefono","E-mail","Data di nascita","Genere"]
  tabella.addHeader(campi)
  for (let i=0; i<valori.length; i++)
  {
    const data = {"Nome":valori[i].name,"Cognome":valori[i].surname,"Privilegi":valori[i].privileges,"Telefono":valori[i].tel,"E-mail":valori[i].email,"Data di nascita":valori[i].dateOfBirth,"Genere":valori[i].gender}
    tabella.addRecord(data,campi)
  }
  users_page.addChild(tabella)
  res.status = result[0]
  users_page.send(res)
  
});

// (GET) ottieni profilo utente specifico (volendo l'utente corrente)
router.get('/area-riservata', verifyToken, (req, res, next) => checkPrivileges(req, res, [0,1,2,3], next),async (req, res) => {

  var result = await userController.getUser(req.query.id); // req.params.userID sarebbe -> .../api/users/5 -> ottiene l'utente 5
  const area_riservata = new HTMLpage(req.user)
  const form = new Form()
  form.setProperty("margin-top","60px")
  form.setProperty("background-color","var(--tema)")
  area_riservata.addChild(form)
  const valori = result[1]
  
  const campi = Object.keys(valori.toJSON())
  
  for (let i=0; i<campi.length; i++){
    const data = new Widget("H3",campi[i]+": "+valori[campi[i]])
    data.setProperty("color","white")
    form.addChild(data)
  }
  
  res.status = result[0]
  area_riservata.send(res)

});

// (GET) biglietti
router.get('/biglietti', async (req, res) => {
    
    const ticket_page = new HTMLpage()
    let data = biglietti[req.query.id]
    let titolo = "Biglietti emessi per l'evento "+req.query.id
    ticket_page.addChild(new Table(data,titolo))
    ticket_page.send(res)
});


// (GET) ottieni eventi per categoria
router.get('/eventi', verifyToken, (req, res, next) => checkPrivileges(req, res, [0,1,2,3], next), async (req, res) => {

    var result = await eventController.getEventByType(req.query.type);
    const event_page = new HTMLpage(req.user)
    event_page.addChild(new ListaEventi(result[1],req.user.privileges))
    event_page.send(res)
  });



router.get('/acquista', verifyToken, (req, res, next) => checkPrivileges(req, res, [0], next), async (req, res) => {

  var result = await eventController.getEvent(req.query.id);
  const event_page = new HTMLpage(req.user)

  const form = new Form("'javascript: buyTicket()'")
  form.setProperty("margin-top","100px")
  form.setProperty("margin-left","300px")
  form.setProperty("width","800px")
  form.setProperty("background-color","rgba(225,236,245,255)")

  const evento = new Event(result[1])
  evento.setProperty("margin-top","60px")
  evento.setProperty("margin-bottom","60px")
  evento.setProperty("margin-left","0")
  evento.addPrice()
  evento.addNumberTicketField()
  evento.addData(["luogo","data","posti_disponibili","orario","organizzatore"])
  form.addChild(evento)
  

  pay_methods_type = ["paypal","visa","mastercard"]
  pay_methods = []
  for (let i=0;i< pay_methods_type.length; i+=1){
    const pay_method = new Widget("img")
    pay_method.setAttribute("src",pay_methods_type[i]+".png")
    pay_method.setAttribute("width","60px")
    pay_methods.push(pay_method.get())
  }

  const radio_buttons = form.addRadioButtons("metodi_pagamento",pay_methods)
  radio_buttons.setProperty("margin-bottom","40px")
  radio_buttons.setProperty("margin-left","160px")

  const info = form.addInfoMessage("Il metodo di pagamento selezionato non è disponibile")
  info.setProperty("margin-left","190px")
  info.setProperty("color","var(--tema)")

  form.addButton("Acquista").setProperty("background-color","var(--tema)")
  
  event_page.addChild(form)
  event_page.send(res)

});

module.exports = router;