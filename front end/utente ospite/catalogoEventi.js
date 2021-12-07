const Bar = require("../bar")
const HTMLpage = require("../HTMLpage")
const ListaEventi = require("../listaEventi")


class CatalogoEventi extends HTMLpage{

    constructor(eventi,email){

        super(email)    //Viene creato un tag di tipo div

        this.addScript("bar")
        const bar = new Bar(this.body) //Crea la navigation bar
        bar.addItem("Accedi","window.location.href='/eventi?type=Cinema'") //Aggiunge il pulsante per il login al menu a tendina della barra
        bar.addItem("Registrati","window.location.href='/sign-in'") //Aggiunge il pulsante per il registrarsi al menu a tendina della barra
        this.addChild(bar) //Aggiunge la navigation bar alla pagina HTML

        this.addChild(new ListaEventi(eventi,(evento)=>{
            evento.addPrice()   //Aggiunge il prezzo all'evento
            evento.addButton("Accedi e acquista","/eventi")    //Aggiunge il pulsante per accedere all'area riservata
            evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
        }))
        
    }

}


module.exports = CatalogoEventi;