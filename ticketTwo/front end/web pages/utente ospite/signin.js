const HTMLpage = require("../../HTML elements").HTMLpage

// Widgets

const Form = require("../../HTML elements").Widgets.Form


/*

La classe implementa la pagina web contenente il form per registrarsi al
sito web.

Il costruttore non richiede nessun parametro.

Disponibile alla rotta: "/users/sign-in"

*/


class Signin extends HTMLpage{
    
    constructor(){

        // Invoca il costruttore della superclasse per generare una pagina web
        // Viene aggiunto un form alla pagina per inserire i dati di registrazione

        super().addChild(new Form("/api/users/register","POST","/eventi?type=Cinema"),form => {

            // Imposta le proprietà CSS del form

            form.setProperty("background-color","white")    //Colore del form
            form.setProperty("margin-top","4vw")    //Margini dall'alto


            // Aggiunge il logo al form

            form.addLogo("Sign in")


            // Aggiunge i campi per inserire i dati di registrazione

            new Array(["Nome"],["Cognome"],["Mail","email"],["Telefono","tel"],["Data di nascita","date"]).forEach((campo) => form.addField(campo[0],campo[1]))
            

            //Aggiunge i radio buttons per selezionare il genere dell'utente

            form.addRadioButtons("Genere",["Donna","Uomo","Altro"]) 


            //Aggiunge un campo al form per inserire la password da usare

            form.addField("Password","password") 


            //Aggiunge un campo al form per confermare la password
            //Imposta l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)

            form.addField("Conferma password","password").setAttribute("onchange","confermaPassword(this)") 


            //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

            form.addInfoMessage() 


            //Aggiunge il pulsante per registare l'account

            form.addButton("Registrati")  

        })  

        // Imposta il colore di sfondo della pagina web

        this.body.setProperty("background-color","rgb(240,242,245)")
        
    }
}



module.exports = Signin;