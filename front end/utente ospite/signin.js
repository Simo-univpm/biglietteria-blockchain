const Form = require("../form")
const HTMLpage = require("../HTMLpage")



class Signin extends HTMLpage{
    

    constructor(){

        super()  //Invoca il costruttore della superclasse.
        this.addScript("form")
        this.addScript("signin")
        this.addScript("confermaPassword")

        const form = new Form("'javascript: signin()'") //Crea un nuovo form
        form.setProperty("background-color","white")

        const campi = [["Nome"],["Cognome"],["Mail","email"],["Telefono","tel"],["'Data di nascita'","date"]]

        for (let i=0; i<campi.length;i+=1)
            form.addField(campi[i][0],campi[i][1])
            
        form.addRadioButtons("Genere",["Donna","Uomo","Altro"]) //Aggiunge i radio buttons per selezionare il genere dell'utente

        form.addField("Password","password") //Aggiunge un campo al form per inserire la password da usare
        const conferma_password = form.addField("'Conferma password'","password") //Aggiunge un campo al form per confermare la password
        conferma_password.setAttribute("onchange","confermaPassword(this)") //Imposta l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)

        form.addInfoMessage("I dati inseriti non sono validi") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        form.addButton("Registrati")  //Aggiunge il pulsante per registare l'account
        
        this.setBackground("SignIn.png") //Imposta lo sfondo della pagina web
        this.addChild(form)
    }
}



module.exports = Signin;