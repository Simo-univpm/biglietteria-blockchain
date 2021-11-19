const User = require('../model/User');

/**
 * 
 * Questo è un middleware, possiamo aggiungerlo ad ogni route che vogliamo sia accedibile solo
 * con certi privilegi.
 * Queste routes non possono essere utilizzate se l'utente non è in possesso del token e dei privilegi necessari.
 * 
*/

async function checkPrivileges(req, res, privileges, next){

    const user = await User.findOne({userID: req.user.userID}); //Cerca l'utente nel database

    /*
     * utente normale = 0
     * eventManager = 1
     * biglietteria = 2 -> controlla differenze con annullatore
     * annullatore = 3 -> controlla differenze con biglietteria
     */

    /*Se l'utente ha i privilegi necessari per accedere alla rotta, l'accesso viene consentito
    Più in particolare si controlla se i privilegi associati all'utente appartengono all'insieme
    dei privilegi necessari per accedere alla rotta. */

    if(privileges.includes(user.privileges)){
        req.user.privileges = user.privileges   //Aggiunge i privilegi dell'utente al corpo della richiesta HTTP
        next();
    } 
    else return res.status(401).send('UNATHORIZED: user [' + user.userID + '] has not the correct privileges to perform that action.');

}



module.exports = checkPrivileges;