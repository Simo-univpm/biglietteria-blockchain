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

    const token = getToken(req)
    
    if( ! token){
        res.status(401)
        res.redirect("/login")
        return;
    }

    try{

        // verifica validità token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;

        next();

    }catch(err){
        res.status(400).send('ERROR: Invalid token' + err);
    }

}



module.exports = verifyToken;