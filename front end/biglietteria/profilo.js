
const AreaRiservata = require("./areaRiservata")
const ProfiloUtente = require("../ProfiloUtente")




class Profilo extends AreaRiservata
{
    //Viene creata una pagina HTML generica

    constructor(userData){
        super(userData.Mail)
        this.addScript("form")
        this.addScript("profilo")
        this.addChild(new ProfiloUtente(userData))
    } 
}

module.exports = Profilo;