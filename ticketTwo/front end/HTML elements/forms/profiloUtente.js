const Form = require("../widgets/form")
const Widget = require("../widget")



/*La classe implementa un semplice form che l'utente può utilizzare per visualizzare il proprio profilo utente.

Il form contiene un elenco in cui sono presenti tutti i dati dell'utente (nome, cognome, mail, ...).

In fondo al form c'è un pulsante per modificare i dati del profilo (email, indirizzo wallet e privilegi non possono essere modificati)

Il costruttore richiede non richiede nessun parametro.

*/


class ProfiloUtente extends Form
{

    constructor(userData){

        // Invoca il costruttore della superclasse per generare un form

        super()
        

        // Aggiunge il logo al form

        this.addLogo("Il mio profilo").setProperty("grid-column","span 2")


        // Imposta alcune proprietà CSS

        this.setProperty("margin-top","2vw")
        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","26% 74%") //Lunghezze delle colonne della griglia


        // Aggiunge i dati del profilo al form

        new Array("Privilegi","Mail","Genere","Nome","Cognome","Data di nascita","Telefono","Indirizzo wallet").forEach(campo => {

            // Nome del campo (colonna di sinistra)

            this.addChild(new Widget("h3",campo+": "),widget => widget.setProperty("color","rgba(138,146,178,255)"))


            // Valore del campo (colonna di destra)

            this.addChild(new Widget("object",userData[campo.replaceAll(" ","_")]),valore => valore.setProperty("margin-top","1.5vw"))

        })

        // Aggiunge un messaggio che viene stampato in caso di errore

        this.addInfoMessage().setProperty("grid-column","span 2")


        // Aggiunge il pulsante per modificare il profilo

        this.addButton("Modifica profilo","window.location.href='/users/modifica-profilo'").setProperty("grid-column","span 2")

    }  
}

module.exports = ProfiloUtente;