const User = require('../model/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../functions/mailer').sendEmail
const generateRandomPassword = require('../functions/generateRandomPassword').generateRandomPassword


class UserController {

    constructor(){}

    async getAllUsers(){

        try{
            const users = await User.find();
            return [200, users];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all users'];
        }
    
    }
    

    async getUser(id){
    
        const user = await User.findOne({userID: id});
        if( ! user) return [404, 'ERROR: user [' + id + '] not found'];

        try{
            return [200, user];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }

    async getAnnullatori(){

        try{
            const users = (await User.find()).filter((value)=>(value.Privilegi=="Annullatore"));
            return [200, users];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all invalidators'];
        }
    
    }

    async updateUserData(id, newParams){

        /**
         * modifica utente corrente e salvalo
         */

        const user = await User.findOne({userID: id});
        if( ! user) return [404, 'ERROR: user [' + decoded.userID + '] not found'];

        user.Nome = newParams.Nome;
        user.Cognome = newParams.Cognome;
        user.Data_di_nascita = newParams.Data_di_nascita;
        user.Genere = newParams.Genere;
        user.Telefono = newParams.Telefono;

        const savedUser = await user.save();
        if( ! savedUser) return [500, 'SERVER ERROR'];

        return [200, 'SUCCESS: user [' + savedUser.userID + '] updated'];

    }

    async updatePrivileges(data){

        const user = await User.findOne({Mail: data.Mail});
        if( ! user) return [404, 'ERROR: user [' + data.Mail + '] not found'];

        //Si possono modificare i privilegi di un utente solo se è un cliente

        if (user.Privilegi=="Cliente"){
            user.Privilegi = data.Privilegi;

            if (data.Privilegi=="Organizzatore eventi")
                user.Organizzatore = data.Organizzatore
            else
                user.Organizzatore = undefined

            const savedUser = await user.save();
            if( ! savedUser) return [500, 'SERVER ERROR'];

            const mail = 'Gentile utente, la informiamo che le sono stati concessi privilegi da '+data.Privilegi.toLowerCase()+'.\n\n'+
                     'Staff ticketTwo'

            sendEmail("Concessione privilegi",data.Mail,mail)

            return [200, 'SUCCESS: user [' + savedUser.userID + '] updated'];
        }

        else
            return [500, 'ERROR: unable to update privileges for user[' + data.Mail + ']'] 

    }

    async modificaPassword(userID,userData){

        const user = await User.findOne({userID: userID});
        if( ! user) return [404, 'ERROR: user [' + userID + '] not found'];

        const validPass = await bcrypt.compare(userData.Vecchia_password, user.Password);
        if( ! validPass) return [400, 'wrong password'];

        // PASSWORD HASHING: tramite hash + salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(userData.Password, salt); // hashing pw with salt

        user.Password = hashedPassword

        const savedUser = await user.save();
        if( ! savedUser) return [500, 'SERVER ERROR'];

        return [200, 'SUCCESS: user [' + savedUser.userID + '] updated'];
    }

    async recuperaPassword(email){
        
        const user = await User.findOne({Mail: email});
        if( ! user) return [404, 'ERROR: user [' + email + '] not found'];

        const randomPassword  = "temp"+ generateRandomPassword(4)

        // PASSWORD HASHING: tramite hash + salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(randomPassword, salt); // hashing pw with salt

        user.Password = hashedPassword

        const savedUser = await user.save();
        if( ! savedUser) return [500, 'SERVER ERROR'];

        const mail = 'Gentile utente, in seguito alla sua richiesta di recupero password le abbiamo inviato una nuova password per accedere al suo account.\n\n'+
                     'La invitiamo a modificare subito la sua password, per avere una maggiore sicurezza.\n\n'+
                     'Password: '+randomPassword+'\n\n'+
                     'Staff ticketTwo'

        sendEmail("Recupero password ticketTwo!",email,mail)

        return [200, 'SUCCESS: user [' + savedUser.userID + '] updated'];
    }


}


// =========================================================================================================================================


module.exports = UserController;