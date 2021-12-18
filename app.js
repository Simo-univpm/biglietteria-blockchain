// imported packages
// Main Configuration JS Command, used to build the environment and to
// connect to the online MongoDB cluster




// Crea un'applicazione web usando la libreria express ====================================================
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '1MB' }));
app.use(cors());
console.log('\n' + '----- | TICKETTWO\'S SERVER | -----' + '\n');
// ================================================================================



// Carica le variabili d'ambiente =================================================
console.log('- environment variables loading...');

const dotenv = require('dotenv');
dotenv.config()
process.env.TICKET_TWO = process.cwd()+"/ticketTwo"
// ================================================================================



// Mappa le rotte del sito web ====================================================
console.log('- mapping routes...');

Object.entries(require("./routes")).forEach(rotta => app.use(rotta[0],rotta[1]))
// ================================================================================



// db connection ==================================================================
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('- connected to database')
);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// =================================================================================

// creazione server ssl con chiave e certificati ===================================
const https = require('https');

const sslServer = https.createServer({key: process.env.RSA_PRIVATE_KEY,cert: process.env.CERTIFICATE},app);
sslServer.listen(process.env.PORT, () => console.log('- listening on port ' + process.env.PORT));
// =================================================================================



// remove listeners =================================================================

const listeners = process.listeners('unhandledRejection')
process.removeListener('unhandledRejection', listeners[listeners.length - 1])