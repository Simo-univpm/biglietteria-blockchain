// imported packages
// Main Configuration JS Command, used to build the environment and to
// connect to the online MongoDB cluster

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const https = require('https');

const compile = require('./system/functions/compile')

const cors = require('cors');

const app = express();

dotenv.config();


// middlewares
app.use(express.json({ limit: '1MB' }));
app.use(cors());

// =============================================================================

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
// =================================================================================


const contract = compile()
console.log('- smart contract compiled')

process.env.ABI = JSON.stringify(contract.abi)
process.env.BYTECODE = JSON.stringify(contract.bytecode)

// creazione server ssl con chiave e certificati
const sslServer = https.createServer({key: process.env.RSA_PRIVATE_KEY,cert: process.env.CERTIFICATE},app);

// server port
const port = process.env.PORT;
sslServer.listen(port, () => console.log('- listening on port ' + port));

const listeners = process.listeners('unhandledRejection')
process.removeListener('unhandledRejection', listeners[listeners.length - 1])