const Biglietto = require("./biglietto")
const Info = require("../info")
const Widget = require("../widget")
const AreaRiservata = require("./areaRiservata")


class ListaBiglietti extends AreaRiservata{

    constructor(biglietti,email){

        super(email)    //Viene creato un tag di tipo div

        const lista_biglietti = new Widget("div")
        lista_biglietti.setProperty("margin-top","5vw")

        if (biglietti.length>0){

           //Aggiunge i biglietti alla lista

            for (let i=0; i<biglietti.length; i+=1)
                lista_biglietti.addChild(new Biglietto(biglietti[i]))   //Crea un nuovo biglietto

        }

        else{
            const info = new Info("Non hai ancora acquistato nessun biglietto")
            info.setProperty("padding-top","16vw")
            lista_biglietti.addChild(info)
        }

        this.addChild(lista_biglietti)
        
    }

}



module.exports = ListaBiglietti;