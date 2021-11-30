
const AreaRiservata = require("./areaRiservata")
const Table = require("../table")


class ListaBiglietti extends AreaRiservata
{

    constructor(email,biglietti){

        super(email) //Crea una nuova pagina HTML (area riservata)

        const tabella = new Table("Biglietti emessi per l'evento "+biglietti[0].eventID)  //Crea una nuova tabella
        this.addChild(tabella)  //Aggiunge la tabella alla pagina web
        
        const campi = ["eventID","ticketCreationDate","ticketCreationTime"] //Campi da visualizzare nella tabella
        tabella.addHeader(campi)  //Aggiunge l'intestazione alla tabella

        for (let i=0; i<biglietti.length; i++)
            tabella.addRecord(biglietti[i],campi) //Aggiunge un record alla tabella
    }
    
}

module.exports = ListaBiglietti;