const jwt = require('jsonwebtoken');
const User = require('../model/User');


async function isUser(req, res, next){

    const decoded = jwt.decode(req.header('auth-token'), process.env.TOKEN_SECRET);
    const user = await User.findOne({userID: decoded.userID}); 

    req.decoded = decoded;

    /**
     * utente normale = 0
     * eventManager = 1
     * biglietteria = 2 -> controlla differenze con annullatore
     * annullatore = 3 -> controlla differenze con biglietteria
     */

    if(user.privileges == 0) next();
    else return res.status(401).send('UNATHORIZED: user [' + user.userID + '] has not the correct privileges to perform that action.');

}


module.exports = isUser;