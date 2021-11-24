 const mongoose = require('mongoose');
 const AutoIncrement = require('mongoose-sequence')(mongoose);
 
 
 // per tenere conto dei contratti deployati nella blockchain
 const contractSchema = new mongoose.Schema({

    blockchainAccount: {
        type: String,
        required: false
    }
       
 });
 
 
 // Campo ticketID, questo plugin permette di effettuare l'auto incremento dell'id ogni volta che viene creato un nuovo biglietto
 receiptSchema.plugin(AutoIncrement,  {inc_field: 'contractID'});
 
 
 module.exports = mongoose.model('Contract', contractSchema);