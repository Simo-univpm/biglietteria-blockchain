const Form = require("../form")
const AreaRiservata = require("./areaRiservata")


/*La classe NewEvent costruisce il form per inserire i dati relativi ad un nuovo evento. 

Eredita dalla classe form. */

class CreaEvento extends AreaRiservata{

    //Costruisce il this
    
    constructor(email) {

        super(email)
        this.addScript("createEvent")
        this.addScript("form")

        this.form = new Form("'javascript: createEvent()'")    //Viene creato un nuovo form
        this.form.setProperty("margin-top","2.8vw")

        this.logo = this.form.addLogo("Newevent.png")

        const campi = [["Nome"],["Artisti"],["Luogo"],["'Data evento'","date"],["Orario","time"],["'Posti totali'","number"],["'Icona evento'","file"],["Prezzo","number"]]

        for (let i=0; i<campi.length;i+=1){
            
            this[campi[i][0].replaceAll(" ","_").replaceAll("'","")] = this.form.addField(campi[i][0],campi[i][1])
            this[campi[i][0].replaceAll(" ","_").replaceAll("'","")].setProperty("height","2.8vw")
        }

        this.type = this.form.addRadioButtons("type",["Cinema","Concerti","Musei","Partite","Teatro"]) //Aggiunge i radio buttons per selezionare il tipo di evento

        this.form.addInfoMessage("I dati inseriti non sono validi") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        
        this.button = this.form.addButton("'Crea evento'") //Aggiunge il pulsante per creare l'evento

        this.addChild(this.form)
    }

}



module.exports = CreaEvento;