const jwt = require('jsonwebtoken');
const getToken = require('../functions/getToken');
const MFA_Staff_biglietteria = require(process.env.TICKET_TWO+"/front end").Staff_biglietteria.MFA
const MFA_Cliente = require(process.env.TICKET_TWO+"/front end").Cliente.MFA
const AuthController = require("../Controllers").AuthController
const generateOTP = new AuthController().generateOTP

function verifyOTP(req, res, next){

    try{

        // Verifica validità del token di autenticazione multifattore (ottenuto inserendo un codice OTP ricevuto tramite mail)
        // Se il token è valido viene decodificato
        // I dati contenuti nel token vengono salvati nell'intestazione della richiesta HTTP

        req.headers.OTP = jwt.verify(getToken(req,"OTP-token"), process.env.TOKEN_SECRET).OTP; //Verifica validità token e ottiene l'utente associato

        
        // Esegue il middleware successivo

        next()

    } catch(err){

        // Genera un codice OTP e lo invia all'utente tramite mail

        generateOTP(req.headers.user.userID,req.headers.user.email)


        // Restituisce come risposta una pagina web in cui inserire il codice OTP

        eval('new MFA_'+req.headers.user.privileges.replace(" ","_")+'(req.headers.user.email,req.originalUrl).send(res,401)')  //Imposta lo stato della richiesta a 401 Unauthorized
    }

}



module.exports = verifyOTP;