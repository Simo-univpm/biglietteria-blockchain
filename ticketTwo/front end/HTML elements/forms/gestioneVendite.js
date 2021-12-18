const Form = require("../widgets/form")


class FormGestioneVendite extends Form{
    
    constructor(operazione,eventID,annullatore) {

        const query = annullatore ? "?id="+eventID+"&annullatore="+annullatore : "?id="+eventID
        super("/api/events/"+operazione.replace(" ","-").toLowerCase()+query,"PATCH","/eventi?type=Cinema")

        this.setProperty("margin-top","13vw")
        this.setProperty("width","24vw")
        this.addLogo("Gestione vendite")

        this.addField("Password wallet","password") //Aggiunge un campo al form per inserire il codice OTP inviato sull'email dell'utente
        this.addInfoMessage() //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        this.addButton(operazione)
    }
}

module.exports = FormGestioneVendite;