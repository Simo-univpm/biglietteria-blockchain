const Form = require("../widgets/form")



class FormModificaPassword extends Form{

    //Costruisce il this
    
    constructor() {

        super("/api/users/modifica-password","PATCH","/?id=Cinema")
        this.setProperty("margin-top","8.8vw")
        this.addLogo("Modifica password")

        this.addField("Vecchia password","password") //Aggiunge un campo al form per inserire la vecchia password dell'account
        this.addField("Password","password") //Aggiunge un campo al form per inserire la nuova password da utilizzare per l'account

        //Aggiunge un campo al form per confermare la nuova password e imposta l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)
        
        this.addField("Conferma password","password").setAttribute("onchange","confermaPassword(this)") 

        this.addInfoMessage() //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        this.addButton("Modifica password") //Aggiunge il pulsante per creare l'evento
    }
}



module.exports = FormModificaPassword;