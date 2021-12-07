const Form = require("./form")



class FormModificaPassword extends Form{

    //Costruisce il this
    
    constructor() {

        super("'javascript: changePassword()'")

        this.setProperty("margin-top","8.8vw")

        this.addLogo("Profilo.png")

        this.addField("'Vecchia password'","password") //Aggiunge un campo al form per inserire la vecchia password dell'account
        this.addField("Password","password") //Aggiunge un campo al form per inserire la nuova password da utilizzare per l'account
        const conferma_password = this.addField("'Conferma password'","password") //Aggiunge un campo al form per confermare la nuovapassword
        conferma_password.setAttribute("onchange","confermaPassword(this)") //Imposta l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)

        this.addInfoMessage("I dati inseriti non sono validi") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        
        this.addButton("'Modifica password'") //Aggiunge il pulsante per creare l'evento

    }

}



module.exports = FormModificaPassword;