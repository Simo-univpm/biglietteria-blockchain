
const Lista = require("../lista")
const AreaRiservata = require("./areaRiservata")


class ListaUtenti extends AreaRiservata
{
    constructor(email,utenti){

        super(email) //Crea una nuova pagina HTML (area riservata)
        this.addScript("table")
        
        this.addChild(new Lista(utenti,["Nome","Cognome","Privilegi","Telefono","Mail","Data di nascita","Genere"],"Utenti registrati a ticketTwo","Nessun utente registrato").getWidget())

    }
    
}

module.exports = ListaUtenti;