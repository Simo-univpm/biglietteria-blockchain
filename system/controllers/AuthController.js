const User = require('../model/User');
const OTP = require('../model/OTP');
const jwt = require('jsonwebtoken');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');
const bcrypt = require('bcryptjs');
const sendEmail = require('../functions/mailer').sendEmail
const generateRandomPassword = require('../functions/generateRandomPassword').generateRandomPassword


const Web3 = require('web3-eth-personal')
const web3 = new Web3(process.env.RPC_URL)


class AuthController {

    constructor(){}

    async login(loginData){

        // CONTROLLO EMAIL: controlla se l'email è nel db
        const user = await User.findOne({Mail: loginData.Mail});
        if( ! user) return [400, 'wrong email or password'];
    
        // CONTROLLO PASSWORD: compara la pw nel body con quella cripatata nel db tramite bcrypt
        const validPass = await bcrypt.compare(loginData.Password, user.Password);
        if( ! validPass) return [400, 'wrong email or password'];

    
    

        /**
         * CREAZIONE E ASSEGNAZIONE JWT: se l'utente è in possesso del token può fare azioni -> private routes middlewares
         * contenuto del token; userID e email utente che ha effettuato il login.
         * 
         * JWTs can be either signed, encrypted or both. If a token is signed, but not encrypted,
         * everyone can read its contents, but when you don't know the private key, you can't change it.
         * Otherwise, the receiver will notice that the signature won't match anymore.
         */

        const token = jwt.sign({ userID: user.userID, email: user.Mail }, process.env.TOKEN_SECRET);

        var userJson = {

            "userID": user.userID,
            "email": user.Mail,
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

        const emailExists = await User.findOne({Mail: registerData.Mail});

        if(emailExists) return [400, 'ERROR: email [' + registerData.Mail + '] already in use'];
    
        // PASSWORD HASHING: tramite hash + salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(registerData.Password, salt); // hashing pw with salt

        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();
        const walletPassword = generateRandomPassword(6)
        const walletAddress = await web3.newAccount(walletPassword)
    
        // CREAZIONE NUOVO UTENTE:
        const user = new User({

            Nome: registerData.Nome,
            Cognome: registerData.Cognome,
            Telefono: registerData.Telefono,
            Data_di_nascita: registerData.Data_di_nascita,
            Genere: registerData.Genere,

            Indirizzo_wallet: walletAddress,

            Mail: registerData.Mail,
            Password: hashedPassword, // pw criptata

            registerDate: currentDate,
            registerTime: currentTime

        });
    
        try{
            const savedUser = await user.save();
            sendEmail("Benvenuto su ticketTwo!",registerData.Mail,"Gentile utente, la sua registrazione a ticketTwo è avvenuta con successo. "+
                      "In allegato alla mail trova la password del suo wallet sulla nostra blockchain.\n\n"+
                      "Password wallet: "+walletPassword+"\n\n"+
                      "Staff ticketTwo")
            return [200, 'SUCCESS: user with id [' + savedUser.userID + '] created'];   
        }catch(err){
            return [500, "SERVER ERROR: couldn't save user " + err];
        }
    
    }

    async generateOTP(userID,email){


        //Genera il codice OTP

        const codiceOTP = generateRandomPassword(4)

        //Invia l'OTP all'utente tramite mail

        sendEmail("Codice OTP ticketTwo",email,"Codice OTP: "+codiceOTP)

        await OTP.deleteMany({userID: userID})

        //Salva l'OTP sul database

        const otp = new OTP({

            userID: userID,
            OTP: codiceOTP
        })

        await otp.save();

        return [200, "Il codice OTP è stato inviato alla mail dell'utente"];
    
    }


    async getTokenOTP(userID,insertOTP){

        const userOTP = await OTP.findOne({userID: userID})

        if (insertOTP!=userOTP.OTP) return [400];

        const token = jwt.sign({ userID: userID, OTP: insertOTP}, process.env.TOKEN_SECRET);

        await OTP.deleteMany({userID: userID})

        return [200, token];
    
    }

}


module.exports = AuthController;