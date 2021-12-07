const Lista = require("../lista")
const AreaRiservata = require("./areaRiservata")


class ListaRicevute extends AreaRiservata
{

    constructor(email,ricevute){

        super(email) //Crea una nuova pagina HTML (area riservata)
        this.addScript("table")
        
        let text = " "
        if (ricevute[0]!=undefined)
            text += ricevute[0].toJSON().items.eventID

        this.addChild(new Lista(ricevute,["id","payment_method","registerDate","registerTime"],"Ricevute emesse per l'evento"+text,"Nessuna ricevuta emessa per questo evento").getWidget())
    }
    
}

module.exports = ListaRicevute;