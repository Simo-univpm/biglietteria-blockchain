const Access = require('../model').Access;
const User = require('../model').User;

const bcrypt = require('bcryptjs');

// Funzione per inviare le mail

const sendEmail = require('../functions/mailer').sendEmail

// Funzione per controllare la validità della password inserita

const checkPassword = require('../functions/checkPassword')

// Funzione per generare le password

const generateRandomPassword = require('../functions/generateRandomPassword').generateRandomPassword

// Funzione per controllare se un wallet è presente sulla blockchain

const isAccount = require('../functions/wallet').isAccount

// Funzioni per interrogare il database

const find = require('../functions/query').find
const findOne = require('../functions/query').findOne
const update = require('../functions/query').update


class UserController {

    constructor(){}



    /*Questa funzione esegue una query nel database per trovare tutti gli utenti iscritti al sito web.

    La funzione non richiede nessun parametro.

    La funzione restituisce lo stato della richiesta e una lista con tutti gli utenti iscritti.*/


    async getAllUsers(){

        return find(User,{})
    }



    /*Questa funzione esegue una query nel database per trovare tutti gli accessi al sito web

    La funzione non richiede nessun parametro.

    La funzione restituisce lo stato della richiesta e una lista degli accessi al sito.*/


    async getAllAccess(){

        return find(Access,{})
    }
    


    /*Questa funzione esegue una query nel database per trovare i dati relativi ad un dato utente.

    La funzione richiede come parametro l'id dell'utente di cui si vogliono ottenere i dati

    La funzione restituisce lo stato della richiesta e un JSON contenente i dati dell'utente.*/


    async getUser(id){
        
        return findOne(User,{userID: id})
    }



    /*Questa funzione esegue una query nel database per trovare tutti gli annullatori iscritti al sito web.

    La funzione non richiede nessun parametro.

    La funzione restituisce lo stato della richiesta e una lista con tutti gli annullatori iscritti.*/


    async getAnnullatori(){

        const result = await find(User,{})
        if(result[0] != 200) return result

        return [200, result[1].filter((user)=>(user.Privilegi == "Annullatore"))]

    }
    


    /*Questa funzione esegue una query nel database per aggiornare i dati profilo di un utente.

    La funzione richiede come parametri:
        - l'id dell'utente che vuole aggiornare i dati del proprio profilo,
        - un JSON contenente i nuovi dati del profilo.

    La funzione restituisce lo stato della richiesta.*/


    async updateUserData(id, newParams){

        return update(User,{userID: id},async user => {

            const isWallet = await isAccount(newParams["Indirizzo_wallet"])

            if (!isWallet) throw "Il wallet inserito non esiste sulla blockchain"

            new Array("Nome","Cognome","Data_di_nascita","Genere","Telefono","Indirizzo_wallet").forEach(campo => user[campo] = newParams[campo])
        })
    }
    


    /*Questa funzione esegue una query nel database per aggiornare i privilegi di un utente.

    La funzione richiede come parametro un JSON contenente i alcuni dati dell'utente (mail, organizzatore, privilegi).

    La funzione restituisce lo stato della richiesta.*/


    async updatePrivileges(data){


        // Aggiorna i privilegi dell'utente

        const result = await update(User,{Mail: data.Mail},user => {

            if (typeof user == 'string') throw "L'utente specificato non esiste"

            //Si possono modificare i privilegi di un utente solo se è un cliente


            if (user.Privilegi == "Cliente"){

                user.Privilegi = data.Privilegi;
                user.Organizzatore = data.Organizzatore
            } 
            else throw "Impossibile aggiornare i priviligi dell'utente " + data.Mail
        })

        if (result[0] != 200) return result


        // Viene inviata una mail all'utente per informarlo dei privilegi concessi

        const mail = 'Gentile utente, la informiamo che le sono stati concessi privilegi da '+data.Privilegi.toLowerCase()+'.\n\n'+
                         'Staff ticketTwo'
    
        sendEmail("Concessione privilegi",data.Mail,mail)

        return result
    }
    


    /*Questa funzione permette ad un utente di modificare la password del proprio account.

    La funzione richiede come parametri:
        - l'id dell'utente che vuole aggiornare i dati del proprio profilo,
        - un JSON contenente la vecchia e la nuova password.

    La funzione restituisce lo stato della richiesta.*/


    async modificaPassword(userID,userData){

        return update(User,{userID: userID},async user => {

            // Controlla se l'utente che vuole modificare la password la conosce
            // In particolare si verifica se la password inserita dall'utente coincide con quella nel database

            const validPass = await bcrypt.compare(userData.Vecchia_password, user.Password);
            if( ! validPass) throw 'La password inserita è errata'

            // Controllo validità password

            checkPassword(userData.Password)

            // PASSWORD HASHING: tramite hash + salt

            const salt = await bcrypt.genSalt(10);
            user.Password  = await bcrypt.hash(userData.Password, salt); // hashing pw with salt

        })
    }
    


    /*Questa funzione permette ad un utente di recuperare la password del proprio account.

    La funzione genera una password temporanea che viene inviata all'utente tramite mail.

    La funzione richiede come parametro la mail dell'utente che desidera recuperare la password.

    La funzione restituisce lo stato della richiesta.*/


    async recuperaPassword(email){

        // Aggiorna la password neldatabase

        return update(User,{Mail: email},async user => {


            // Genera una password casuale

            const randomPassword  = "temp"+ generateRandomPassword(4)


            // PASSWORD HASHING: tramite hash + salt

            const salt = await bcrypt.genSalt(10);
            user.Password  = await bcrypt.hash(randomPassword, salt); // hashing pw with salt

            
            // Invia una mail all'utente con allegata la nuova password

            const mail = 'Gentile utente, in seguito alla sua richiesta di recupero password le abbiamo inviato una nuova password per accedere al suo account.\n\n'+
                        'La invitiamo a modificare subito la sua password, per avere una maggiore sicurezza.\n\n'+
                        'Password: '+randomPassword+'\n\n'+
                        'Staff ticketTwo'

            sendEmail("Recupero password ticketTwo!",email,mail)
        })
    }

}


// =========================================================================================================================================


module.exports = UserController;