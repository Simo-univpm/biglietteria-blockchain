const AreaRiservata = require("./areaRiservata")
const Form = require("../../HTML elements").Widgets.Form



/*La classe NewEvent costruisce il form per inserire i dati relativi ad un nuovo evento. 

Eredita dalla classe form. */

class CreaEvento extends AreaRiservata{

    //Costruisce il this
    
    constructor(email,text="Crea evento",reqType="POST") {

        super(email)

        this.form = new Form("/api/events",reqType,"/eventi?type=Cinema")    //Viene creato un nuovo form
        this.form.setProperty("margin-top","2.8vw")

        this.form.addLogo(text)

        new Array(["Nome"],["Artisti"],["Luogo"],["Data evento","date"],["Orario","time"],["Posti totali","number"],["Icona evento","file"],["Prezzo","number"])
        .forEach((campo) => this[campo[0]] = this.form.addField(campo[0],campo[1],"2.8vw"))

        this.type = this.form.addRadioButtons("type",["Cinema","Concerti","Musei","Partite","Teatro"]) //Aggiunge i radio buttons per selezionare il tipo di evento
        this.form.addInfoMessage() //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        this.form.addButton(text) //Aggiunge il pulsante per creare l'evento

        this.addChild(this.form)
    }

}



module.exports = CreaEvento;