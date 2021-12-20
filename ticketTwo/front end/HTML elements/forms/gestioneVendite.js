const Form = require("../widgets/form")



/*La classe implementa un semplice form che può essere utilizzato per aprire
o chiudere le vendite dei biglietti relative ad un evento.

Il form contiene un campo dove l'utente deve inserire la password del wallet
e un pulsante che permette di inviare i dati al server ed eseguire loperazione.

Il costruttore richiede come parametri:
    - il tipo di operazione da effettuare (apertura o chiusura delle vendite),
    - l'id dell'evento su cui si vuole eseguire l'operazione,
    - l'indirizzo del wallet dell'annullatore da associare all'evento (necessario solo per l'apertura delle vendite).

*/


class FormGestioneVendite extends Form{
    
    constructor(operazione,eventID,annullatore) {

        // Costruisce la query string aggiungendo come parametri l'id dell'evento e l'indirizzo wallet dell'annullatore (opzionale)

        const query = annullatore ? "?id="+eventID+"&annullatore="+annullatore : "?id="+eventID


        // Invoca il costruttore della superclasse per generare un form
        /* Sono impostati:
            - l'indirizzo dell'api a cui inviare i dati ("/api/events/apri-vendite" o "/api/events/chiudi-vendite"),
            - il tipo di richiesta (PATCH),
            - l'url al cui reindirizzare il client quando si ottiene la risposta del server.
        */
        
        super("/api/events/"+operazione.replace(" ","-").toLowerCase()+query,"PATCH","/eventi?type=Cinema")


        // Imposta alcune proprietà CSS

        this.setProperty("margin-top","13vw")   //Margini dall'alto
        this.setProperty("width","24vw")    //Lunghezza


        // Aggiunge il logo al form

        this.addLogo("Gestione vendite")


        // Aggiunge un campo al form per inserire il codice OTP inviato sull'email dell'utente

        this.addField("Password wallet","password") 


        // Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        this.addInfoMessage() 


        // Aggiunge il pulsante per inviare i dati al server
        
        this.addButton(operazione)
    }
}

module.exports = FormGestioneVendite;