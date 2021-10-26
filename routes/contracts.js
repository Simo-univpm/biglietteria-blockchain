const router = require('express').Router();
const blockchain = require('../blockchain/blockchain_api')


// (GET) deploy del contratto
router.get('/', async (req, res) => {
    
    console.log(blockchain.compila("biglietto"));
    res.status(200).json("ciao");

});


module.exports = router;