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

}


// =========================================================================================================================================


module.exports = UserController;