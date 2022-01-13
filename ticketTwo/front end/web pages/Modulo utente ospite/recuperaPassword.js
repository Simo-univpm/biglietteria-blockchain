const HTMLpage = require("../../HTML elements").HTMLpage

// Widgets

const Form = require("../../HTML elements").Widgets.Form
const Logo = require("../../HTML elements").Widgets.Logo


/*

La classe implementa la pagina web contenente il form per recuperare la password
del proprio account in caso di smarrimento.

Il costruttore non richiede nessun parametro.

Disponibile alla rotta: "/users/recupera-password"

*/


class RecuperaPassword extends HTMLpage{
    

    constructor(){


        // Invoca il costruttore della superclasse per generare una pagina web
        // Viene aggiunto il logo del sito

        super().addChild(new Logo())


        // Imposta il colore di sfondo della pagina web

        this.body.setProperty("background-color","rgb(240,242,245)") 


        //Aggiunge un form alla pagina web

        this.addChild(new Form("/api/users/recupera-password","POST","/eventi?type=Cinema"),form => {

            // Imposta le proprietà CSS del form

            form.setProperty("margin-top","-16vw") //Distanza della finestra di login dall'alto
            form.setProperty("margin-left","60vw") //Distanza della finestra di login da sinistra
            form.setProperty("padding-bottom","2vw") //Spazio in basso alla finestra
            form.setProperty("background-color","white") //Colore dello sfondo
            form.setProperty("width","26vw") //Lunghezza della finestra di login


            //Aggiunge il testo al form (istruzioni su come recuperare la password)

            form.addText("Inserendo i propri il proprio username le verrà inviata una mail contenente le istruzioni per recuperare la propria password")  


            //Aggiunge un campo al form per inserire l'e-mail

            form.addField("Mail","email") 


            // Aggiunge un messaggio che verrà stampato in caso d'errore

            form.addInfoMessage()


            //Aggiunge il pulsante per recuperare la password

            form.addButton("Avanti") 
        
        })
    }
}



module.exports = RecuperaPassword;