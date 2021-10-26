// imported packages
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(cors());

// =============================================================================



console.log('\n' + '----- | TICKETTWO\'S SERVER | -----' + '\n');

// imported routes
const usersRoute = require('./routes/users');
const eventsRoute = require('./routes/events');
const contractsRoute = require('./routes/contracts');
const pagesRoute = require('./routes/pages');

// route middlewares
// endpoints -> frontend manipola risorse messe a disposizione con get e post volendo anche delete 
app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/contracts', contractsRoute);
app.use('', pagesRoute);

app.use(express.static('./front end'));



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