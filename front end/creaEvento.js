const Form = require("../front end/form")
const Widget = require("../front end/widget")
const HTMLpage = require("../front end/HTMLpage")


/*La classe NewEvent costruisce il form per inserire i dati relativi ad un nuovo evento. 

Eredita dalla classe form. */

class CreaEvento extends HTMLpage{

    //Costruisce il this
    
    constructor(user) {

        super(user)
        this.form = new Form("'javascript: createEvent()'")    //Viene creato un nuovo form
        this.form.setProperty("margin-top","40px")


        this.logo = new Widget("img")   //Crea un tag di tipo img
        this.logo.setAttribute("src","NewEvent.png")    //Imposta la sorgente dell'immagine
        this.logo.setProperty("width","50%")    //Lunghezza dell'immagine
        this.form.addChild(this.logo)    //Aggiunge il logo al form

        this.Nome = this.form.addField("Nome")  //Aggiunge il campo per inserire il nome dell'evento
        this.Artisti = this.form.addField("Artisti")  //Aggiunge il campo per inserire gli artisti dell'evento
        this.Luogo = this.form.addField("Luogo")  //Aggiunge il campo per inserire il luogo dell'evento
        this.Data_evento = this.form.addField("'Data evento'","date")  //Aggiunge il campo per inserire la data dell'evento
        this.Orario = this.form.addField("Orario","time") //Aggiunge il campo per inserire l'orario dell'evento
        this.Posti_totali = this.form.addField("'Posti totali'","number")  //Aggiunge il campo per inserire il numero di posti dell'evento
        this.Icona_evento = this.form.addField("'Icona evento'","file") //Aggiunge il campo per inserire l'icona dell'evento
        this.Prezzo = this.form.addField("Prezzo","number") //Aggiunge il campo per inserire il prezzo del biglietto dell'evento

        this.type = this.form.addRadioButtons("type",["Cinema","Concerti","Musei","Partite","Teatro"]) //Aggiunge i radio buttons per selezionare il tipo di evento
        this.type.setProperty("margin-left","42px") //Distanza del contenitore dei radio buttons dal bordo sinistro

        this.form.addInfoMessage("I dati inseriti non sono validi").setProperty("margin-left","36%") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        
        this.button = this.form.addButton("'Crea evento'") //Aggiunge il pulsante per creare l'evento
        this.button.setProperty("background-color","rgba(98,104,143,255)")
        this.button.setProperty("margin-top","20px") //Distanza del pulsante dal bordo in alto

        this.addChild(this.form)
    }

}



module.exports = CreaEvento;