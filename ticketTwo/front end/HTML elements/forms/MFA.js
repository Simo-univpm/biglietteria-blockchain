const Form = require("../widgets/form")


/*La classe implementa un semplice form che può essere utilizzato per inserire il 
codice OTP necessario agli utenti per eseguire un'autenticazione a due fattori.

Il form contiene un campo dove l'utente deve inserire il codice OTP ricevuto
tramite mail e un pulsante per inviare i dati al server.

Il costruttore richiede come parametro l'url a cui reindirizzare il client nel caso
l'autenticazione avesse successo.

*/


class FormMFA extends Form{
    
    constructor(redirect_url) {

        // Invoca il costruttore della superclasse per generare un form

        super("/api/users/mfa","POST",redirect_url)


        // Imposta alcune proprietà CSS

        this.setProperty("margin-top","13vw")   //Margini dall'alto
        this.setProperty("width","24vw")    //Lunghezza


        // Aggiunge il logo al form

        this.addLogo("MFA")


        //Aggiunge un campo al form per inserire il codice OTP inviato sull'email dell'utente

        this.addField("OTP") 


        //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        this.addInfoMessage() 


        //Aggiunge il pulsante per inviare il codice OTP al server

        this.addButton("Verifica codice OTP") 

    }

}

module.exports = FormMFA;