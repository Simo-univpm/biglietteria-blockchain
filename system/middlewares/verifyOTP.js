const jwt = require('jsonwebtoken');
const getToken = require('../functions/getToken');
const MFA_Staff_biglietteria = require(process.cwd()+'/front end/biglietteria').MFA
const MFA_Cliente = require(process.cwd()+'/front end/cliente').MFA
const AuthController = require("../Controllers").AuthController
const generateOTP = new AuthController().generateOTP

function verifyOTP(req, res, next){

    const token = getToken(req,"OTP-token") //Ottiene il token associato alla richiesta

    if( ! token){
        res.status(401) //Imposta lo stato della richiesta a 401 Unauthorized
        generateOTP(req.user.userID,req.user.email)
        eval('new MFA_'+req.user.privileges.replace(" ","_")+'(req.user.email,req.originalUrl).send(res)')
        return
    }

    try{
        req.OTP = jwt.verify(token, process.env.TOKEN_SECRET).OTP; //Verifica validità token e ottiene l'utente associato
        next();

    }catch(err){
        res.status(400).send('ERROR: Invalid token' + err); //Invia un messaggio d'errore al client
    }

}



module.exports = verifyOTP;