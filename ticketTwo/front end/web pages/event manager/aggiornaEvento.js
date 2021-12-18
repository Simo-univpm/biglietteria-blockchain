const CreaEvento = require("./creaEvento")

class AggiornaEvento extends CreaEvento{

    constructor(email,data) {

        if(typeof data != 'string'){

            super(email,"Aggiorna dati evento","PATCH")
        
            this["Icona evento"].setAttribute("disabled","true")
            this["Icona evento"].setProperty("display","none")

            Object.keys(data).forEach((key) => {if (Object.keys(this).includes(key.replaceAll("_"," "))) this[key.replaceAll("_"," ")].setAttribute("value","'"+data[key]+"'")})
        }

        else super(email)
    }

}



module.exports = AggiornaEvento;