const Access = require('../model').Access;
const OTP = require('../model').OTP;
const User = require('../model').User;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Funzione per inviare le mail

const sendEmail = require('../functions/mailer').sendEmail

// Funzione per generare un nuovo wallet

const createWallet = require('../functions/wallet').createWallet

// Funzione per generare codici OTP

const generateRandomPassword = require('../functions/generateRandomPassword').generateRandomPassword

// Funzioni per ottenere data e ora corrente

const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');

// Funzioni per interrogare il database

const create = require('../functions/query').create
const findOne = require('../functions/query').findOne



class AuthController {

    constructor(){}

    async login(loginData){

        try{
            
            // CONTROLLO EMAIL: controlla se l'email è nel db
            const user = await User.findOne({Mail: loginData.Mail});
            if( ! user) return [400, 'Il nome utente o la password inseriti sono errati'];
        
            // CONTROLLO PASSWORD: compara la pw nel body con quella cripatata nel db tramite bcrypt
            const validPass = await bcrypt.compare(loginData.Password, user.Password);
            if( ! validPass) return [400, 'Il nome utente o la password inseriti sono errati'];

            /**
             * CREAZIONE E ASSEGNAZIONE JWT: se l'utente è in possesso del token può fare azioni -> private routes middlewares
             * contenuto del token; userID e email utente che ha effettuato il login.
             * 
             * JWTs can be either signed, encrypted or both. If a token is signed, but not encrypted,
             * everyone can read its contents, but when you don't know the private key, you can't change it.
             * Otherwise, the receiver will notice that the signature won't match anymore.
             */

            const token = jwt.sign({
                
                userID: user.userID,
                email: user.Mail,
                privileges: user.Privilegi,
                walletAddress: user.Indirizzo_wallet,
                Organizzatore: user.Organizzatore
                
            }, process.env.TOKEN_SECRET);

            create(Access,{

                Mail: loginData.Mail,
                Data_accesso: getCurrentDate(),
                Orario_accesso: getCurrentTime()
            })

            return [200, 'Accesso consentito', token]

        } catch{
            return [500, 'SERVER ERROR']
        }

    }
    
    
    async register(registerData){
    
        // CONTROLLO EMAIL IN USO: controlla se la email è già presente nel db

        const emailExists = await User.findOne({Mail: registerData.Mail});
        if(emailExists) return [400, "L'email " + registerData.Mail + " è già stata utilizzata"];
    
        // PASSWORD HASHING: tramite hash + salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(registerData.Password, salt); // hashing pw with salt

        const wallet = await createWallet()
        if (!wallet) return [500, "Il server non è connesso alla blockchain"]


        // CREAZIONE NUOVO UTENTE:
        const result = await create(User,{

            Nome: registerData.Nome,
            Cognome: registerData.Cognome,
            Telefono: registerData.Telefono,
            Data_di_nascita: registerData.Data_di_nascita,
            Genere: registerData.Genere,
            Indirizzo_wallet: wallet.address,

            Mail: registerData.Mail,
            Password: hashedPassword, // pw criptata

            registerDate: getCurrentDate(),
            registerTime: getCurrentTime()

        })

        if (result[0] != 200) return result

        const mail = "Gentile utente, la sua registrazione a ticketTwo è avvenuta con successo. "+
                     "In allegato alla mail trova la password del suo wallet sulla nostra blockchain.\n\n"+
                     "Password wallet: "+wallet.password+"\n\n"+
                     "Staff ticketTwo"

        sendEmail("Benvenuto su ticketTwo!", registerData.Mail, mail)

        return result

    }

    async generateOTP(userID,email){

        //Salva l'OTP sul database

        return create(OTP,{userID: userID},async data => {

            //Genera il codice OTP

            data.OTP = generateRandomPassword(4)


            //Invia l'OTP all'utente tramite mail

            sendEmail("Codice OTP ticketTwo",email,"Codice OTP: "+data.OTP)


            // Elimina tutti i precedenti codici OTP richiesti dall'utente presenti nel database
            // Risulta necessario, poichè un utente potrebbe richiedere un codice OTP e non accedere alla risorsa protetta

            await OTP.deleteMany({userID: userID})
        })

    }


    async getTokenOTP(userID,insertOTP){
            
        return await findOne(OTP,{userID: userID},async userOTP => {

            // Verifca se nel database è presente il codice OTP associato all'utente

            if(! userOTP) throw "Il codice OTP inserito non è valido"


            // Verifica se il codice inserito dall'utente cororrisponde a quello nel database

            if (insertOTP != userOTP.OTP) throw "Il codice OTP inserito è errato"


            // Genera il token di autenticazione multifattore

            const token = jwt.sign({ userID: userID, OTP: insertOTP}, process.env.TOKEN_SECRET);


            // Elimina il codice OTP relativo all'utente dal database (ormai non serve più, è temporaneo)

            await OTP.deleteMany({userID: userID})


            // Restituisce lo stato della richiesta e il token di autenticazione multi fattore

            return [200, 'Accesso consentito', token]
        })

    }

}


module.exports = AuthController;