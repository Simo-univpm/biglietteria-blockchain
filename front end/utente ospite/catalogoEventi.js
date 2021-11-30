const Bar = require("../bar")
const Event = require("../event")
const Info = require("../info")
const HTMLpage = require("../HTMLpage")
const ListaEventi = require("../listaEventi")


class CatalogoEventi extends HTMLpage{

    constructor(eventi,email){

        super(email)    //Viene creato un tag di tipo div

        this.addScript("bar")
        const bar = new Bar(this.body) //Crea la navigation bar
        bar.addItem("Accedi","window.location.href='/login'") //Aggiunge il pulsante per il login al menu a tendina della barra
        bar.addItem("Registrati","window.location.href='/sign-in'") //Aggiunge il pulsante per il registrarsi al menu a tendina della barra
        this.addChild(bar) //Aggiunge la navigation bar alla pagina HTML

        const listaEventi = new ListaEventi()

        if (eventi.length>0){

            //Aggiunge gli eventi alla lista

            for (let i=0; i<eventi.length; i+=1){

                const evento = new Event(eventi[i]) //Crea un nuovo evento
                evento.addPrice()   //Aggiunge il prezzo all'evento
                evento.addButton("Accedi e acquista","'/login'")    //Aggiunge il pulsante per accedere all'area riservata
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
                listaEventi.addChild(evento)
            }
        }

        else{
            const info = new Info("Nessun evento disponibile")
            info.setProperty("padding-top","160px")
            listaEventi.addChild(info)
        }
        

        this.addChild(listaEventi)   //Aggiunge l'evento alla lista 
        
        
    }

}



module.exports = CatalogoEventi;