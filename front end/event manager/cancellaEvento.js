const Form = require("../form")
const Event = require("../event")
const AreaRiservata = require("./areaRiservata")
const Widget = require("../widget")



class CancellaEvento extends AreaRiservata{
    

    constructor(email,data){

        super(email)  //Invoca il costruttore della superclasse.
        this.addScript("deleteEvent")

        const form = new Form("'javascript: deleteEvent()'")  //Crea un nuovo form
        form.setProperty("margin-top","3.8vw")  //Margini dall'alto

        form.addLogo("ModifyEvent.png")  //Aggiunge il logo al form

        //Riquadro con i dati dell'evento
        
        const evento = new Event(data) //Crea un nuovo evento (widget)
        //evento.setProperty("margin-top","40vw") //Margini dall'alto
        evento.setProperty("margin-left","0")  //Margini dal basso
        evento.setProperty("width","50vw") //Margini da sinistra
        evento.addData(["Luogo","Data_Evento","Posti_disponibili","Orario","Artisti","Prezzo","eventID","eventCreationDate","eventCreationTime"]) //Specifica i campi da visulizzare
        form.addChild(evento) //Aggiunge l'evento al form

        form.addInfoMessage("Impossibile eliminare l'evento")  //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        form.addButton("Elimina evento")  //Aggiunge il pulsante per acquistare i biglietti al form

        this.addChild(form)
    }
}



module.exports = CancellaEvento;