const Form = require("../form")
const Event = require("../event")
const AreaRiservata = require("./areaRiservata")
const Widget = require("../widget")



class CancellaEvento extends AreaRiservata{
    

    constructor(email,data){

        super(email)  //Invoca il costruttore della superclasse. 

        const form = new Form("'javascript: deleteEvent()'")  //Crea un nuovo form
        form.setProperty("margin-top","80px")  //Margini dall'alto
        form.setProperty("margin-left","300px") //Margini da sinistra
        form.setProperty("width","800px") //Lunghezza

        const logo = new Widget("img")  //Crea un nuovo tag di tipo img
        logo.setAttribute("src","ModifyEvent.png")  //Imposta la sorgente dell'immagine
        logo.setProperty("width","50%") //Lunghezza dell'immagine
        form.addChild(logo) //Aggiunge il logo al form

        //Riquadro con i dati dell'evento
        
        const evento = new Event(data) //Crea un nuovo evento (widget)
        evento.setProperty("margin-top","40px") //Margini dall'alto
        evento.setProperty("margin-bottom","20px")  //Margini dal basso
        evento.setProperty("margin-left","0") //Margini da sinistra
        evento.addData(["Luogo","Data_Evento","Posti_disponibili","Orario","Artisti","Prezzo","eventID","eventCreationDate","eventCreationTime"]) //Specifica i campi da visulizzare
        form.addChild(evento) //Aggiunge l'evento al form

        //Messaggio informativo

        const info = form.addInfoMessage("Impossibile eliminare l'evento")  //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        info.setProperty("margin-left","190px") //Margini da sinistra
        info.setProperty("color","var(--tema)") //Colore del testo

        const button = form.addButton("Elimina evento")  //Aggiunge il pulsante per acquistare i biglietti al form
        button.setProperty("background-color","var(--tema)")
        button.setProperty("margin-top","40px")

        this.addChild(form)
    }
}



module.exports = CancellaEvento;