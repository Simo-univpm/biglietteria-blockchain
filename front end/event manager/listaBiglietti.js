const Lista = require("../lista")
const AreaRiservata = require("./areaRiservata")


class ListaBiglietti extends AreaRiservata
{

    constructor(email,biglietti){

        super(email) //Crea una nuova pagina HTML (area riservata)
        this.addScript("table")

        let text = " "
        if (biglietti[0]!=undefined)
            text += biglietti[0].toJSON().eventID
        this.addChild(new Lista(biglietti,["eventID","ticketCreationDate","ticketCreationTime"],"Biglietti emessi per l'evento"+text,"Nessun biglietto emesso per questo evento").getWidget())
    }
    
}

module.exports = ListaBiglietti;