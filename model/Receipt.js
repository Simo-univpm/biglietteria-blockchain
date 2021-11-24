/**
 * 
 * vedi dati ritornati dai metodi di paypal
 * 
 */


 const mongoose = require('mongoose');
 const AutoIncrement = require('mongoose-sequence')(mongoose);
 
 
 // Questo è il formato del biglietto a db
 const receiptSchema = new mongoose.Schema({
       
 });
 
 
 // Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
 receiptSchema.plugin(AutoIncrement,  {inc_field: 'receiptID'});
 
 
 module.exports = mongoose.model('Receipt', receiptSchema);