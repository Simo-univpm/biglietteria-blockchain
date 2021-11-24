
const HTMLpage = require("./HTMLpage")
const Table = require("./table")


class ListaUtenti extends HTMLpage
{

    constructor(user,utenti){

        super(user) //Crea una nuova pagina HTML (area riservata)
        
        const tabella = new Table("Utenti registrati a ticketTwo")  //Crea una nuova tabella
        this.addChild(tabella)  //Aggiunge la tabella alla pagina web
        
        const campi = ["Nome","Cognome","Privilegi","Telefono","Mail","Data di nascita","Genere"] //Campi da visualizzare nella tabella
        tabella.addHeader(campi)  //Aggiunge l'intestazione alla tabella

        for (let i=0; i<utenti.length; i++)
            tabella.addRecord(utenti[i],campi) //Aggiunge un record alla tabella
    }
    
}

module.exports = ListaUtenti;