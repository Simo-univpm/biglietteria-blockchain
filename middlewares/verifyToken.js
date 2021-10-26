const jwt = require('jsonwebtoken');

/**
 * 
 * Questo è un middleware, possiamo aggiungerlo ad ogni route che vogliamo sia protetta o privta;
 * queste routes non possono essere utilizzate se l'utente non è in possesso del token.
 * Il token si ottiene al login.
 * 
 * in sostanza ci si implementano tutte le cose che può fare un utente autenticato con il login.
 * Se l'utente non è autenticato non riesce ad accedere alle rotte private e non può compiere
 * determinate azioni tipo visualizzare gli eventi o accedere alla sua area riservata.
 * 
*/

function verifyToken(req, res, next){

    // controllo della presenza del token del login nell'header
    
    const token = req.header('auth-token');
    if( ! token) return res.status(401).send('ACCESS DENIED');

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