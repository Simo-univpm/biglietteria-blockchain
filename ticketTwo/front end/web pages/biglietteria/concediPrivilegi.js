
const AreaRiservata = require("./areaRiservata")
const Form = require("../../HTML elements").Widgets.Form


class ConcediPrivilegi extends AreaRiservata
{

    constructor(email){

        super(email).addChild(new Form("/api/users/privileges","PATCH","/eventi?type=Cinema"),form => {

            form.setProperty("margin-top","12vw")
            form.addLogo("Concedi privilegi") //Aggiunge il logo al form

            form.addField("Mail","email")
            form.addHiddenField("Organizzatore")
            form.addRadioButtons("Privilegi",["Organizzatore eventi","Staff biglietteria","Annullatore"]).setAttribute("oninput","showField(this,'Organizzatore')")
            form.addInfoMessage() //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
            form.addButton("Concedi privilegi")
        })

    }
    
}

module.exports = ConcediPrivilegi;