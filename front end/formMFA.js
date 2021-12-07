const Form = require("./form")


class FormMFA extends Form{
    
    constructor(redirect_url) {

        super("'javascript: sendOTP("+'"'+redirect_url+'"'+")'")

        this.setProperty("margin-top","13vw")
        this.setProperty("width","24vw")
        this.addLogo("/MFA.png")

        this.addField("OTP") //Aggiunge un campo al form per inserire il codice OTP inviato sull'email dell'utente
        this.addInfoMessage("Autenticazione fallita") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        this.addButton("'Verifica codice OTP'") //Aggiunge il pulsante per creare l'evento

    }

}

module.exports = FormMFA;