const Biglietto = require("./biglietto")
const Widget = require("../widget")
const AreaRiservata = require("./areaRiservata")


class ListaBiglietti extends AreaRiservata{

    constructor(biglietti,email){

        super(email)    //Viene creato un tag di tipo div

        const lista_biglietti = new Widget("div")
        lista_biglietti.setProperty("margin-top","80px")


        //Aggiunge i biglietti alla lista

        for (let i=0; i<biglietti.length; i+=1)
            lista_biglietti.addChild(new Biglietto(biglietti[i]))   //Crea un nuovo biglietto

        this.addChild(lista_biglietti)   //Aggiunge l'biglietto alla lista 
        
        
    }

}



module.exports = ListaBiglietti;