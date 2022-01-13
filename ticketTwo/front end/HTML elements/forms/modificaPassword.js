const Form = require("../widgets/form")


/*La classe implementa un semplice form che l'utente può utilizzare per modificare
la password del proprio account.

Il form contiene tre campi:
    - uno per inserire la password corrente,
    - uno per inserire la nuova password,
    - uno per confermare la nuova password inserita.

In fondo al form c'è un pulsante per inviare i dati al server e aggiornare al password.

Il costruttore richiede non richiede nessun parametro.

*/


class FormModificaPassword extends Form{
    
    constructor() {

        // Invoca il costruttore della superclasse per generare un form

        super("/api/users/modifica-password","PATCH","/?id=Cinema")


        // Imposta i margini dall'alto

        this.setProperty("margin-top","8.8vw")

        
        // Aggiunge il logo al form

        this.addLogo("Modifica password")


        // Aggiunge un campo al form per inserire la vecchia password dell'account

        this.addField("Vecchia password","password") 


        // Aggiunge un campo al form per inserire la nuova password da utilizzare per l'account

        this.addField("Password","password") 


        // Aggiunge un campo al form per confermare la nuova password
        // Viene anche impostata l'azione (lato client) da eseguire quando si inserisce la conferma della password (controlla se password e conferma sono uguali)
        
        this.addField("Conferma password","password").setAttribute("onchange","confermaPassword(this)") 


        //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        this.addInfoMessage() 


        //Aggiunge il pulsante per modificare la password

        this.addButton("Modifica password") 
    }
}



module.exports = FormModificaPassword;