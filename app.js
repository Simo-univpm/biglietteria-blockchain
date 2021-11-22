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

//!!!! DA FARE

//!!!NOTA!!! Bisogna creare il modello per i biglietti nel database.
//!!!NOTA!!! Bisogna creare una funzione per filtrare gli eventi in base all'organizzatore
//!!!NOTA!!! Aggiungere un campo all'evento per dire se i biglietti sono in vendita o meno????
//!!!NOTA!!! Aggiungere un campo all'evento per gli artisti
//!!!NOTA!!! Nel database memorizziamo l'immagine dell'evento o il percorso????
//!!!NOTA!!! Va aggiunto il protocollo https!!! (Basta aggiungere una libreria)
//!!!NOTA!!! L'autenticazione a più fattori la mettiamo????
//!!!NOTA!!! Negli utenti va aggiunto un campo per l'indirizzo dell'account su blockchain
//!!!NOTA!!! Negli eventi va aggiunto un campo per l'indirizzo del contratto associato
//!!!NOTA!!! Quali dati usiamo per generari il QR code del biglietto???
//!!!NOTA!!! Implementare sigillo fiscale
//!!!NOTA!!! Aggiungere api per modificare un evento già esistente
//!!!NOTA!!! Aggiungere api per modificare un utente già esistente
//!!!NOTA!!! Implementare contratto in solidity (avevamo già iniziato a fare qualcosa)
//!!!NOTA!!! Bisogna salvare le ricevute di pagamento nel database
//!!!NOTA!!! Gestire l'invio di una mail per recuperare la password??????
//!!!NOTA!!! Inviare una mail quando viene emesso il biglietto?????
//!!!NOTA!!! Fare una pagina web in cui ci sono tutti i biglietti acquistati da un utente
//!!!NOTA!!! Come si creano gli account su quorum?? Come gestiamo le chiavi private??
//!!!NOTA!!! Sistemare area riservata


//!!!! FATTO
//!!!NOTA!!! L'autenticazione adesso funziona
//!!!NOTA!!! Il controllo dei privilegi funziona
//!!!NOTA!!! Le chiamate alla blockchain funzionano
//!!!NOTA!!! Aggiunto paypal come servizio di pagamento (è molto semplice da usare) (lo lasciamo o mettiamo altro????)


console.log('\n' + '----- | TICKETTWO\'S SERVER | -----' + '\n');

// imported routes
const usersRoute = require('./routes/users');
const eventsRoute = require('./routes/events');
const homeRoute = require('./routes/HTMLpages');
const paymentsRoute = require('./routes/payments');

// route middlewares
/*
endpoints -> frontend manipola risorse messe a disposizione con get e post volendo anche delete 
app.js (il presente file) è il "main" della web-app, e genera le seguenti quattro rotte
*/
//localhost:8080/seguito dalle rotte sottostanti. Accedendo a localhost:8080/ si va alla home
app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/pay', paymentsRoute);
app.use('/', homeRoute);
//la creazione viene fatta dal file pages.js in /routes/pages.js

app.use(express.static('./front end/static'));
app.use(express.static('./icone eventi'));



// db connection ==================================================================
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('- connected to database')
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// =================================================================================

// server port
const port = process.env.PORT;
app.listen(port, () => console.log('- listening on port ' + port));