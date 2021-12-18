const Form = require("../../HTML elements").Widgets.Form
const HTMLpage = require("../../HTML elements").HTMLpage



class Signin extends HTMLpage{
    
    constructor(){

        super()  //Invoca il costruttore della superclasse.

        const form = new Form("/api/users/register","POST","/eventi?type=Cinema") //Crea un nuovo form
        form.setProperty("background-color","white")
        form.setProperty("margin-top","4vw")

        form.addLogo("Sign in")

        new Array(["Nome"],["Cognome"],["Mail","email"],["Telefono","tel"],["Data di nascita","date"]).forEach((campo) => form.addField(campo[0],campo[1]))
            
        form.addRadioButtons("Genere",["Donna","Uomo","Altro"]) //Aggiunge i radio buttons per selezionare il genere dell'utente

        form.addField("Password","password") //Aggiunge un campo al form per inserire la password da usare
        const conferma_password = form.addField("Conferma password","password") //Aggiunge un campo al form per confermare la password
        conferma_password.setAttribute("onchange","confermaPassword(this)") //Imposta l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)

        form.addInfoMessage() //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        form.addButton("Registrati")  //Aggiunge il pulsante per registare l'account
        
        this.body.setProperty("background-color","rgb(240,242,245)")
        this.addChild(form)
    }
}



module.exports = Signin;