const FormModificaPassword = require("../formModificaPassword")
const HTMLpage = require("../HTMLpage")



class ModificaPassword extends HTMLpage{

    //Costruisce il this
    
    constructor(email) {

        super(email)
        this.addScript("changePassword")
        this.addScript("confermaPassword")
        this.addScript("form")

        this.addChild(new FormModificaPassword())
    }

}



module.exports = ModificaPassword;