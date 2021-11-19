const Form = require("../front end/form")
const Widget = require("../front end/widget")


/*La classe NewEvent costruisce il form per inserire i dati relativi ad un nuovo evento. 

Eredita dalla classe form. */

class NewEvent extends Form{

    //Costruisce il this
    
    constructor() {
        super("'javascript: createEvent()'")    //Viene creato un nuovo this
        this.setProperty("margin-top","40px")

        this.logo = new Widget("img")   //Crea un tag di tipo img
        this.logo.setAttribute("src","NewEvent.png")    //Imposta la sorgente dell'immagine
        this.logo.setProperty("width","50%")    //Lunghezza dell'immagine
        this.addChild(this.logo)    //Aggiunge il logo al form

        this.nome = this.addField("nome","Nome")  //Aggiunge il campo per inserire il nome dell'evento
        this.luogo = this.addField("luogo","Luogo")  //Aggiunge il campo per inserire il luogo dell'evento
        this.data = this.addField("data","'Data evento'","date")  //Aggiunge il campo per inserire la data dell'evento
        this.orario = this.addField("orario","Orario","time") //Aggiunge il campo per inserire l'orario dell'evento
        this.posti = this.addField("postiTotali","'Posti Totali'","number")  //Aggiunge il campo per inserire il numero di posti dell'evento
        this.immagine = this.addField("immagine","'Carica una foto da utilizzare come copertina'","file") //Aggiunge il campo per inserire l'icona dell'evento
        this.prezzo = this.addField("prezzo","Prezzo","number") //Aggiunge il campo per inserire il prezzo del biglietto dell'evento

        this.radio_buttons = this.addRadioButtons("event_type",["Cinema","Concerti","Musei","Partite","Teatro"]) //Aggiunge i radio buttons per selezionare il tipo di evento
        this.radio_buttons.setProperty("margin-left","42px") //Distanza del contenitore dei radio buttons dal bordo sinistro

        this.addInfoMessage("I dati inseriti non sono validi").setProperty("margin-left","36%") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        
        const button = this.addButton("'Crea evento'") //Aggiunge il pulsante per creare l'evento
        button.setProperty("background-color","rgba(98,104,143,255)")
    }

    setValues(nome,luogo,data,orario,posti,immagine,prezzo,tipo){

        this.logo.setAttribute("src","ModifyEvent.png")
        this.nome.setAttribute("value","'"+nome+"'")
        this.luogo.setAttribute("value","'"+luogo+"'")
        this.data.setAttribute("value",data)
        this.orario.setAttribute("value",orario)
        this.posti.setAttribute("value",posti)
        this.immagine.setAttribute("value",immagine)
        this.prezzo.setAttribute("value",prezzo)
        this.radio_buttons.setAttribute("value",tipo)
    }

}



module.exports = NewEvent;