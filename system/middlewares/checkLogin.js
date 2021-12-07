const getToken = require('../functions/getToken');


/**
 * 
 * Questo è un middleware. Se l'utente è autenticato questo viene reindirizzato nella propria area
 * riservata, altrimenti viene eseguita la next function.
 * 
*/

function checkLogin(req, res, next){

    const token = getToken(req,"auth-token") //Ottiene il token associato alla richiesta

    //Se la categoria degli eventi non è specificata si imposta Cinema di default

    if (req.query.type==undefined)
        req.query.type = "Cinema"
    
    if(token){
        res.redirect("/eventi?type="+req.query.type)  //Se l'utente possiede il token di autenticazione viene reindirizzato all'area riservata
        return;
    }
    else
        next()

}



module.exports = checkLogin;