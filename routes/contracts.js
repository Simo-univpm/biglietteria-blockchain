const router = require('express').Router();
const Contract = require('../blockchain/contracts')
const contract = new Contract()

router.get('/:method', async (req, res) => {

    //var result = await blockchain.call(req.params.method);
    //res.status(200).json(result);
  });


module.exports = router;