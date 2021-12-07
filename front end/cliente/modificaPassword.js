const FormModificaPassword = require("../formModificaPassword")
const AreaRiservata = require("./areaRiservata")



class ModificaPassword extends AreaRiservata{

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