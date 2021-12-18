const AreaRiservata = require("./areaRiservata")
const Form = require("../../HTML elements").Widgets.Form
const Card = require("../../HTML elements").Widgets.Card
const Info = require("../../HTML elements").Widgets.Info


class CancellaEvento extends AreaRiservata{
    
    constructor(email,data){

        super(email)  //Invoca il costruttore della superclasse.
        
        typeof data != 'string' ? this.addChild(new Form("/api/events","DELETE","/eventi?type=Cinema"),form => {

            form.setProperty("margin-top","3.8vw")  //Margini dall'alto

            form.addLogo("Elimina evento")  //Aggiunge il logo al form

            //Riquadro con i dati dell'evento
            
            const evento = new Card(data) //Crea un nuovo evento (widget)
            evento.setProperty("margin-left","0")  //Margini dal basso
            evento.setProperty("width","50vw") //Margini da sinistra
            evento.addData(["Luogo","Data_Evento","Posti_disponibili","Orario","Artisti","Prezzo","eventID","eventCreationDate","eventCreationTime"]) //Specifica i campi da visulizzare
            form.addChild(evento) //Aggiunge l'evento al form

            form.addInfoMessage()  //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

            form.addButton("Elimina evento")  //Aggiunge il pulsante per acquistare i biglietti al form
        }) : this.addChild(new Info("Al momento non è possibile eliminare l'evento"))
    }
}



module.exports = CancellaEvento;