const getToken = require('../functions/getToken');


/**
 * 
 * Questo è un middleware. Se l'utente è autenticato questo viene reindirizzato nella propria area
 * riservata, altrimenti viene eseguita la next function.
 * 
*/


function checkLogin(req, res, next){

    //Se la categoria degli eventi non è specificata si imposta Cinema di default

    if (!req.query.type) req.query.type = "Cinema"
    

    //Se l'utente possiede il token di autenticazione viene reindirizzato all'area riservata, altrimenti si esegue la next function

    getToken(req,"auth-token") ? res.redirect("/eventi?type="+req.query.type) : next()

}



module.exports = checkLogin;