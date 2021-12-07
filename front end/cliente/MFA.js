const FormMFA = require("../formMFA")
const AreaRiservata = require("./areaRiservata")



class MFA extends AreaRiservata{

    //Costruisce il this
    
    constructor(email,redirect_url) {

        super(email)
        this.addScript("MFA")
        this.addScript("form")

        this.addChild(new FormMFA(redirect_url))
    }

}



module.exports = MFA;