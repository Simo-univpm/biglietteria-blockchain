const Access = require('../model').Access;
const User = require('../model').User;

const bcrypt = require('bcryptjs');

const sendEmail = require('../functions/mailer').sendEmail
const generateRandomPassword = require('../functions/generateRandomPassword').generateRandomPassword

const find = require('../functions/query').find
const findOne = require('../functions/query').findOne
const update = require('../functions/query').update


class UserController {

    constructor(){}

    async getAllUsers(){

        return find(User,{})
    }

    async getAllAccess(){

        return find(Access,{})
    }
    

    async getUser(id){
        
        return findOne(User,{userID: id})
    }

    async getAnnullatori(){

        return find(User,{},users => {

            users = users.filter((user)=>(user.Privilegi == "Annullatore"))

            return [200, users]
        })
    }

    async updateUserData(id, newParams){

        return update(User,{userID: id},user => {

            new Array("Nome","Cognome","Data_di_nascita","Genere","Telefono").forEach(campo => user[campo] = newParams[campo])
        })
    }

    async updatePrivileges(data){


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

        const mail = 'Gentile utente, la informiamo che le sono stati concessi privilegi da '+data.Privilegi.toLowerCase()+'.\n\n'+
                         'Staff ticketTwo'
    
        sendEmail("Concessione privilegi",data.Mail,mail)

        return result
    }

    async modificaPassword(userID,userData){

        return update(User,{userID: userID},async user => {

            const validPass = await bcrypt.compare(userData.Vecchia_password, user.Password);
            if( ! validPass) throw 'La password inserita è errata'

            // PASSWORD HASHING: tramite hash + salt
            const salt = await bcrypt.genSalt(10);
            user.Password  = await bcrypt.hash(userData.Password, salt); // hashing pw with salt

        })
    }

    async recuperaPassword(email){

        return update(User,{Mail: email},async user => {

            const randomPassword  = "temp"+ generateRandomPassword(4)

            // PASSWORD HASHING: tramite hash + salt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword  = await bcrypt.hash(randomPassword, salt); // hashing pw with salt

            user.Password = hashedPassword

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