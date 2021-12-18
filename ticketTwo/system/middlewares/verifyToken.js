const jwt = require('jsonwebtoken');
const getToken = require('../functions/getToken');
const Login = require(process.env.TICKET_TWO+"/front end").UtenteOspite.Login


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

    try{
        
        // Verifica validità del token di autenticazione
        // Se il token è valido viene decodificato
        // I dati contenuti nel token vengono salvati nell'intestazione della richiesta HTTP

        req.headers.user = jwt.verify(getToken(req,"auth-token"), process.env.TOKEN_SECRET);

        
        // Esegue il middleware successivo

        next()

    } catch{

        // Se il token non è valido, viene spedita come risposta alla richiesta la pagina di login
        // Inserendo le credenziali si potrà poi accedere alla rotta

        new Login(req.originalUrl).send(res,401)    //Imposta lo stato della richiesta a 401 Unauthorized
    }
}


module.exports = verifyToken;