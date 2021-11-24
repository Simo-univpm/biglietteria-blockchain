
const HTMLpage = require("./HTMLpage")
const Form = require("./form")
const Widget = require("./widget")


class ConcediPrivilegi extends HTMLpage
{

    constructor(user){

        super(user) //Crea una nuova pagina HTML (area riservata)
        const form = new Form("'javascript: grantPrivileges()'")  //Crea un nuovo form
        form.setAttribute("oninput","showEventManagerField()")
        form.setProperty("margin-top","120px")

        const logo = new Widget("img")  //Crea un nuovo tag di tipo img
        logo.setAttribute("src","GrantPrivileges.png")  //Imposta la sorgente dell'immagine
        logo.setProperty("width","50%") //Lunghezza dell'immagine
        logo.setProperty("margin-bottom","20px")  //Margini dal basso
        form.addChild(logo) //Aggiunge il logo al form

        form.addField("Mail","email")
        const event_manager_field = form.addField("Organizzatore")
        event_manager_field.setAttribute("disabled","true")
        event_manager_field.setProperty("margin-top","10px")
        event_manager_field.setProperty("display","none")

        form.addRadioButtons("Privilegi",["Organizzatore eventi","Staff biglietteria","Annullatore"]).setProperty("margin-left","80px")

        form.addInfoMessage("I dati inseriti non sono validi").setProperty("margin-left","36%") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        const button = form.addButton("'Concedi privilegi'")
        button.setProperty("background-color","rgba(98,104,143,255)")
        button.setProperty("margin-top","20px")

        this.addChild(form) //Aggiunge il form alla pagina web

    }
    
}

module.exports = ConcediPrivilegi;