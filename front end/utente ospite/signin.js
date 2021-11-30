const Form = require("../form")
const HTMLpage = require("../HTMLpage")



class Signin extends HTMLpage{
    

    constructor(){

        super()  //Invoca il costruttore della superclasse.
        this.addScript("form")
        this.addScript("signin")

        const form = new Form("'javascript: signin()'") //Crea un nuovo form
        form.setProperty("background-color","white")
        form.addField("Nome")  //Aggiunge un campo al form per inserire il nome
        form.addField("Cognome")  //Aggiunge un campo al form per inserire il cognome
        form.addField("Mail","email") //Aggiunge un campo al form per inserire l'email
        form.addField("Telefono","tel") //Aggiunge un campo al form per inserire il telefono
        form.addField("'Data di nascita'","date") //Aggiunge un campo al form per inserire la data di nascita

        const radio_buttons = form.addRadioButtons("Genere",["Donna","Uomo","Altro"]) //Aggiunge i radio buttons per selezionare il genere dell'utente
        radio_buttons.setProperty("margin-left","172px") //Distanza del contenitore dei radio buttons dal bordo sinistro

        form.addField("Password","password") //Aggiunge un campo al form per inserire la password da usare
        const conferma_password = form.addField("'Conferma password'","password") //Aggiunge un campo al form per confermare la password
        conferma_password.setAttribute("onchange","confermaPassword(this)") //Imposta l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)

        form.addInfoMessage("I dati inseriti non sono validi").setProperty("margin-left","36%") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        const button = form.addButton("Registrati")  //Aggiunge il pulsante per registare l'account
        button.setProperty("background-color","var(--tema)")
        button.setProperty("margin-top","20px")
        
        this.setBackground("SignIn.png") //Imposta lo sfondo della pagina web
        this.addChild(form)
    }
}



module.exports = Signin;