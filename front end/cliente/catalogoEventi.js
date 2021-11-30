const Event = require("../event")
const Info = require("../info")
const ListaEventi = require("../listaEventi")
const AreaRiservata = require("./areaRiservata")


class CatalogoEventi extends AreaRiservata{

    constructor(eventi,email){

        super(email)    //Viene creato un tag di tipo div

        const listaEventi = new ListaEventi()

        if (eventi.length>0){

            //Aggiunge gli eventi alla lista

            for (let i=0; i<eventi.length; i+=1){

                const evento = new Event(eventi[i]) //Crea un nuovo evento
                evento.addPrice()   //Aggiunge il prezzo all'evento
                evento.addButton("Acquista ora","'/acquista?id="+eventi[i].eventID+"'") //Aggiunge il pulsante per acquistare un biglietto
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