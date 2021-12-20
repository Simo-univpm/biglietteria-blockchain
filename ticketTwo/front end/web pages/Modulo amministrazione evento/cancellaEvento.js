const AreaRiservata = require("./areaRiservata")

// Widgets

const Form = require("../../HTML elements").Widgets.Form
const Card = require("../../HTML elements").Widgets.Card
const Info = require("../../HTML elements").Widgets.Info


/*La classe implementa una pagina web contenente un semplice form che permette di eliminare un evento dal database dell'applicazione web.
Le modifiche sono possibili solo se le vendite dei biglietti sono chiuse.

In fondo al form c'è un pulsante per inviare al server una richiesta HTTP di tipo DELETE che elimina l'evento dal database.

Il costruttore richiede come parametro la mail dell'event manager e un oggetto contenente i dati dell'evento.

*/


class CancellaEvento extends AreaRiservata{
    
    constructor(email,data){
    
        // Invoca il costruttore della superclasse per generare una pagina web

        super(email)  


        // Aggiunge un form alla pagina web
        
        typeof data != 'string' ? this.addChild(new Form("/api/events","DELETE","/eventi?type=Cinema"),form => {

            // Margini dall'alto

            form.setProperty("margin-top","3.8vw")  


            // Aggiunge il logo al form

            form.addLogo("Elimina evento")  


            // Aggiunge un riquadro con i dati dell'evento
            
            form.addChild(new Card(data),evento => {

                // Imposta le proprietà CSS della card

                evento.setProperty("margin-left","0")  //Margini dal basso
                evento.setProperty("width","50vw") //Margini da sinistra

                // Specifica i campi da visulizzare

                evento.addData(["Luogo","Data_Evento","Posti_disponibili","Orario","Artisti","Prezzo","eventID","eventCreationDate","eventCreationTime"]) 
                
            })


            //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

            form.addInfoMessage()  


            //Aggiunge il pulsante per acquistare i biglietti al form

            form.addButton("Elimina evento")  
            
        }) : this.addChild(new Info("Al momento non è possibile eliminare l'evento"))
    }
}



module.exports = CancellaEvento;