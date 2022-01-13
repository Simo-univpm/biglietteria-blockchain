const Form = require("../widgets/form")


/*La classe implementa un semplice form che l'utente può utilizzare per modificare il proprio profilo utente.

Il form contiene una serie di caselle di testo in cui sono inseriti i dati dell'utente (nome, cognome, data di nascita, ...).

In fondo al form c'è un pulsante per salvare le modifiche (invia il contenuto delle caselle di testo al form).

Il costruttore richiede richiede come parametro un oggetto contenente i dati del profilo dell'utente.

*/


class ProfiloUtente extends Form
{

    constructor(userData){

        // Invoca il costruttore della superclasse per generare un form
        /* Sono impostati:
            - l'indirizzo dell'api a cui inviare i dati ("/api/users"),
            - il tipo di richiesta (PATCH),
            - l'url al cui reindirizzare il client quando si ottiene la risposta del server (la pagina del profilo).
        */

        super("/api/users","PATCH","/users/profilo").setProperty("margin-top","8vw")


        // Aggiunge il logo al form

        this.addLogo("Il mio profilo")


        // Aggiunge le caselle di testo al form

        new Array(["Nome"],["Cognome"],["Data di nascita","date"],["Telefono"],["Indirizzo_wallet"]).forEach(campo => this.addField(campo[0],campo[1]).setAttribute("value",userData[campo[0].replaceAll(" ","_")]))
            
            
        // Aggiunge al form i radio buttons per selezionare il genere

        this.addRadioButtons("Genere",["Donna","Uomo","Altro"],userData["Genere"])


        // Aggiunge un messaggio che viene stampato in caso di errore

        this.addInfoMessage()


        // Aggiunge il pulsante per modificare il profilo
        
        this.addButton("Salva modifiche")

    }  
}

module.exports = ProfiloUtente;