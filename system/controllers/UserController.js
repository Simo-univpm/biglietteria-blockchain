const User = require('../model/User');


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

        user.Privilegi = data.Privilegi;

        if (data.Privilegi=="Organizzatore eventi")
            user.Organizzatore = data.Organizzatore
        else
            user.Organizzatore = undefined

        const savedUser = await user.save();
        if( ! savedUser) return [500, 'SERVER ERROR'];

        return [200, 'SUCCESS: user [' + savedUser.userID + '] updated'];

    }


}


// =========================================================================================================================================


module.exports = UserController;