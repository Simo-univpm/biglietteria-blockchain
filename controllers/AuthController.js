const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');
const bcrypt = require('bcryptjs');


class AuthController {

    constructor(){}

    async login(loginData){

        // CONTROLLO EMAIL: controlla se l'email è nel db
        const user = await User.findOne({email: loginData.email});
        if( ! user) return [400, 'wrong email or password'];
    
        // CONTROLO PASSWORD: compara la pw nel body con quella cripatata nel db tramite bcrypt
        const validPass = await bcrypt.compare(loginData.password, user.password);
        if( ! validPass) return [400, 'wrong email or password'];
    

        /**
         * CREAZIONE E ASSEGNAZIONE JWT: se l'utente è in possesso del token può fare azioni -> private routes middlewares
         * contenuto del token; userID e email utente che ha effettuato il login.
         * 
         * JWTs can be either signed, encrypted or both. If a token is signed, but not encrypted,
         * everyone can read its contents, but when you don't know the private key, you can't change it.
         * Otherwise, the receiver will notice that the signature won't match anymore.
         */

        const token = jwt.sign({ userID: user.userID, email: user.email }, process.env.TOKEN_SECRET);

        var userJson = {

            "userID": user.userID,
            "email": user.email,
            "token": token
            
        }
    

        /** metti try catch
         * 
        try{
            const savedUser = await user.save();
            return [200, 'SUCCESS: user with id [' + savedUser.userID + '] created'];   
        }catch(err){
            return [500, "SERVER ERROR: couldn't save user " + err];
        }
        */

        return [200, token, userJson];
    
    }
    
    
    async register(registerData){
        
        // CONTROLLO EMAIL IN USO: controlla se la email è già presente nel db
        const emailExists = await User.findOne({email: registerData.email});
        if(emailExists) return [400, 'ERROR: email [' + registerData.email + '] already in use'];
    
        // PASSWORD HASHING: tramite hash + salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(registerData.password, salt); // hashing pw with salt
    
        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();
    
        // CREAZIONE NUOVO UTENTE:
        const user = new User({

            name: registerData.name,
            surname: registerData.surname,
            tel: registerData.tel,
            dateOfBirth: registerData.dateOfBirth,
            gender: registerData.gender,

            email: registerData.email,
            password: hashedPassword, // pw criptata

            registerDate: currentDate,
            registerTime: currentTime

        });
    
        try{
            const savedUser = await user.save();
            return [200, 'SUCCESS: user with id [' + savedUser.userID + '] created'];   
        }catch(err){
            return [500, "SERVER ERROR: couldn't save user " + err];
        }
    
    }

}


module.exports = AuthController;