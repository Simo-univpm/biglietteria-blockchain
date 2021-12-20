const AreaRiservata = require("./areaRiservata")

// Widgets

const Form = require("../../HTML elements").Widgets.Form


/*La classe implementa una pagina web contenente un semplice form che permette di inserire i dati
dell'evento (nome, luogo, numero posti, ...) che si vuole aggiungere al database.

In fondo al form c'è un pulsante per inviare i dati al server e creare l'evento.

Il costruttore richiede come parametro la mail dell'event manager e un oggetto contenente i dati dell'evento.

*/



class CreaEvento extends AreaRiservata{
    
    constructor(email,text="Crea evento",reqType="POST",checked="Cinema") {

        // Genera una nuova pagina web e aggiunge il form per inserire i dati dell'evento

        super(email).addChild(new Form("/api/events",reqType,"/eventi?type=Cinema"),form => {

            // Margini dall'alto

            form.setProperty("margin-top","2.8vw")

            
            // Aggiunge il logo al form

            form.addLogo(text)


            // Aggiunge le caselle di testo per inserire i dati dell'evento

            new Array(["Nome"],["Artisti"],["Luogo"],["Data evento","date"],["Orario","time"],["Posti totali","number"],["Icona evento","file"],["Prezzo","number"])
            .forEach((campo) => this[campo[0]] = form.addField(campo[0],campo[1],"2.8vw"))


            //Aggiunge i radio buttons per selezionare il tipo di evento

            this.type = form.addRadioButtons("type",["Cinema","Concerti","Musei","Partite","Teatro"],checked) 


            //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

            form.addInfoMessage() 


            //Aggiunge il pulsante per creare l'evento

            form.addButton(text) 
        })
        
    }

}



module.exports = CreaEvento;