const User = require('../model/User');

async function checkPrivileges(req, res, privileges, next){

    const user = await User.findOne({userID: req.user.userID}); 

    /*
     * utente normale = 0
     * eventManager = 1
     * biglietteria = 2 -> controlla differenze con annullatore
     * annullatore = 3 -> controlla differenze con biglietteria
     */


    if(privileges.includes(user.privileges)){
        req.user.privileges = user.privileges
        next();
    } 
    else return res.status(401).send('UNATHORIZED: user [' + user.userID + '] has not the correct privileges to perform that action.');

}


module.exports = checkPrivileges;