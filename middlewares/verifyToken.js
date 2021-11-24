const jwt = require('jsonwebtoken');
const getToken = require('./getToken');


/**
 * 
 * Questo è un middleware, possiamo aggiungerlo ad ogni route che vogliamo sia protetta o privata;
 * queste routes non possono essere utilizzate se l'utente non è in possesso del token.
 * Il token si ottiene al login.
 * 
 * in sostanza ci si implementano tutte le cose che può fare un utente autenticato con il login.
 * Se l'utente non è autenticato non riesce ad accedere alle rotte private e non può compiere
 * determinate azioni tipo visualizzare gli eventi o accedere alla sua area riservata.
 * 
*/

function verifyToken(req, res, next){

    const token = getToken(req) //Ottiene il token associato alla richiesta
    
    if( ! token){
        res.status(401) //Imposta lo stato della richiesta a 401 Unauthorized
        res.redirect("/login")  //Reindirizza il client alla pagina di login
        return;
    }

    try{

        req.user = jwt.verify(token, process.env.TOKEN_SECRET); //Verifica validità token e ottiene l'utente associato
        next();

    }catch(err){
        res.status(400).send('ERROR: Invalid token' + err); //Invia un messaggio d'errore al client
    }

}



module.exports = verifyToken;