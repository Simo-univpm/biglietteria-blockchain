// imported packages
// Main Configuration JS Command, used to build the environment and to
// connect to the online MongoDB cluster

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const cors = require('cors');

// middlewares
app.use(express.json({ limit: '1MB' }));
app.use(cors());

// =============================================================================

//!!!! DA FARE ========================================================================

// Va aggiunto il protocollo https!!! (Basta aggiungere una libreria)
// Implementare sigillo fiscale
// Come si creano gli account su quorum?? Come gestiamo le chiavi private??

//Creare modello per la ricevuta
//Creare controller per le ricevute (byUser,byEvent,tutte)
//Creare api per eliminare un evento (solo dal db quando non è ancora in vendita)
//Decrementare numero posti quando si compra un biglietto



//!!! DA FINIRE =======================================================================
// Bisogna salvare le ricevute di pagamento nel database
// Gestire l'invio di una mail per recuperare la password??????
// Inviare una mail quando viene emesso il biglietto?????
// L'autenticazione a più fattori la mettiamo?? magari tramite email
// Implementare contratto in solidity (avevamo già iniziato a fare qualcosa)



//!!!! FATTO ==========================================================================
// L'autenticazione adesso funziona
// Il controllo dei privilegi funziona
// Le chiamate alla blockchain funzionano
// Aggiunto paypal come servizio di pagamento (è molto semplice da usare) (lo lasciamo o mettiamo altro????)
// Aggiungere un campo all'evento per dire se i biglietti sono in vendita o meno????
// Fare una pagina web in cui ci sono tutti i biglietti acquistati da un utente
// Quali dati usiamo per generari il QR code del biglietto --> dati del biglietto valido + dati utente che possiede il biglietto + hash di questi 2

// Bisogna creare una funzione per filtrare gli eventi in base all'organizzatore
// Aggiungere un campo all'evento per gli artisti
// Negli utenti va aggiunto un campo per l'indirizzo dell'account su blockchain
// Negli eventi va aggiunto un campo per l'indirizzo del contratto associato
// Bisogna creare il modello per i biglietti nel database.
// Sistemare area riservata
// Aggiungere api per modificare un evento già esistente
// Aggiungere api per modificare un utente già esistente
// Nel database memorizziamo l'immagine dell'evento o il percorso???? --->>>immagine

console.log('\n' + '----- | TICKETTWO\'S SERVER | -----' + '\n');

// imported routes
const usersRoute = require('./routes/users');
const eventsRoute = require('./routes/events');
const homeRoute = require('./routes/HTMLpages');
const ticketsRoute = require('./routes/tickets');

// route middlewares
/*
endpoints -> frontend manipola risorse messe a disposizione con get e post volendo anche delete 
app.js (il presente file) è il "main" della web-app, e genera le seguenti quattro rotte
*/
//localhost:8080/seguito dalle rotte sottostanti. Accedendo a localhost:8080/ si va alla home
app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/tickets', ticketsRoute);
app.use('/', homeRoute);
//la creazione viene fatta dal file pages.js in /routes/pages.js

app.use(express.static('front end/css'));

app.use(express.static('front end/images'));
app.use(express.static('front end/annullatore/images'));
app.use(express.static('front end/biglietteria/images'));
app.use(express.static('front end/cliente/images'));
app.use(express.static('front end/event manager/images'));
app.use(express.static('front end/utente ospite/images'));

app.use(express.static('front end/script'));
app.use(express.static('front end/annullatore/script'));
app.use(express.static('front end/biglietteria/script'));
app.use(express.static('front end/cliente/script'));
app.use(express.static('front end/event manager/script'));
app.use(express.static('front end/utente ospite/script'));

app.use(express.static('jsqr/dist'));


// db connection ==================================================================
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('- connected to database')
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//db.collections.events.update({}, {$rename:{"organizzatore":"Organizzatore"}}, false, true);
// =================================================================================

// server port
const port = process.env.PORT;
app.listen(port, () => console.log('- listening on port ' + port));


//Ricevuta pagamento

/*
{
  id: 'PAYID-MGPF7QY5B941442X63409626',
  intent: 'sale',
  state: 'approved',
  cart: '6DC01792MF6745927',
  payer: {
    payment_method: 'paypal',
    status: 'VERIFIED',
    payer_info: {
      email: 'cliente.tickettwo@gmail.com',
      first_name: 'John',
      last_name: 'Doe',
      payer_id: 'GE49HC6JQHHUA',
      shipping_address: [Object],
      country_code: 'IT'
    }
  },
  transactions: [
    {
      amount: [Object],
      payee: [Object],
      description: 'Pagamento bilietto verso tickeTwo',
      item_list: [Object],
      related_resources: [Array]
    }
  ],
  failed_transactions: [],
  create_time: '2021-11-24T15:52:35Z',
  update_time: '2021-11-24T15:52:43Z',
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAYID-MGPF7QY5B941442X63409626',
      rel: 'self',
      method: 'GET'
    }
  ],
  httpStatusCode: 200
}*/