
const AreaRiservata = require("./areaRiservata")

// Widgets

const Form = require("../../HTML elements").Widgets.Form

/*La classe implementa una pagina web contenente un semplice form che permette di modificare i privilegi di un utente.
Le modifiche sono permesse solo se l'utente ha privilegi da cliente.

Il form contiene due campi:
    - uno per inserire la l'email dell'utente a cui concedere maggiori privilegi,
    - uno per inserire il nome della società di appartenenza (solo se l'utente è un event manager).

In fondo al form c'è un pulsante per inviare i dati al server e modificare i privilegi

Il costruttore richiede come parametro la mail dell'utente della biglietteria.

*/


class ConcediPrivilegi extends AreaRiservata
{

    constructor(email){

        // Aggiunge un form alla pagina web

        super(email).addChild(new Form("/api/users/privileges","PATCH","/eventi?type=Cinema"),form => {

            // Margini dall'alto

            form.setProperty("margin-top","12vw")


            // Aggiunge il logo al form

            form.addLogo("Concedi privilegi")


            // Aggiunge una casella di testo per inserire la mail dell'utente a cui si vuole concedere nuovi privilegi

            form.addField("Mail","email")


            // Aggiunge una casella di testo per inserire il nome della società di appartenenza (solo se l'utente è un event manager)

            form.addHiddenField("Organizzatore")


            // Aggiunge i radio buttons per selezionare il tipo di privilegi

            form.addRadioButtons("Privilegi",["Organizzatore eventi","Staff biglietteria","Annullatore"]).setAttribute("oninput","showField(this,'Organizzatore')")


            // Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

            form.addInfoMessage() 


            // Aggiunge il pulsante per inviare i dati al server

            form.addButton("Concedi privilegi")
        })

    }
    
}

module.exports = ConcediPrivilegi;