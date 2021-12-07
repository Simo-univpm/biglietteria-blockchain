
const AreaRiservata = require("./areaRiservata")
const Form = require("../form")
const Widget = require("../widget")


class ConcediPrivilegi extends AreaRiservata
{

    constructor(email){

        super(email) //Crea una nuova pagina HTML (area riservata)
        this.addScript("form")
        this.addScript("grantPrivileges")

        const form = new Form("'javascript: grantPrivileges()'")  //Crea un nuovo form
        form.setAttribute("oninput","showEventManagerField()")
        form.setProperty("margin-top","12vw")

        form.addLogo("GrantPrivileges.png") //Aggiunge il logo al form

        form.addField("Mail","email")
        const event_manager_field = form.addField("Organizzatore")
        event_manager_field.setAttribute("disabled","true")
        event_manager_field.setProperty("display","none")

        form.addRadioButtons("Privilegi",["Organizzatore eventi","Staff biglietteria","Annullatore"]).setProperty("margin-left","-6vw")

        form.addInfoMessage("I dati inseriti non sono validi") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        form.addButton("'Concedi privilegi'")

        this.addChild(form) //Aggiunge il form alla pagina web

    }
    
}

module.exports = ConcediPrivilegi;