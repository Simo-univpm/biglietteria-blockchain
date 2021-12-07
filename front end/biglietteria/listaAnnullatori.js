
const Lista = require("../lista")
const AreaRiservata = require("./areaRiservata")


class ListaAnnullatori extends AreaRiservata
{
    constructor(email,eventID,annullatori){

        super(email) //Crea una nuova pagina HTML (area riservata)
        this.addScript("table")
        this.addScript("listaAnnullatori")
        this.addChild(new Lista(annullatori,["Nome","Cognome","Telefono","Mail","Indirizzo wallet","Genere"],"Seleziona un annullatore per l'evento "+eventID,"Nessun annullatore disponibile","selezionaAnnullatore(this)").getWidget())

    }
    
}

module.exports = ListaAnnullatori;