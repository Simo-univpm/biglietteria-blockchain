const Event = require("../Event")
const Info = require("../Info")
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
                if (eventi[i].stato==0){
                    evento.addButton("Modifica evento","'/update-event?id="+eventi[i].eventID+"'")  //Aggiunge il pulsante per modificare un evento (solo se in biglietti non sono ancora in vendita)
                    evento.addButton("Elimina evento","'/delete-event?id="+eventi[i].eventID+"'")  //Aggiunge il pulsante per cancellare un evento (solo se in biglietti non sono ancora in vendita)
                }
                else{
                    evento.addButton("Gestione biglietti","'/biglietti?id="+eventi[i].eventID+"'")
                    evento.addButton("Gestione ingressi","'/ingressi?id="+eventi[i].eventID+"'")
                }
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","eventID","eventCreationDate","eventCreationTime","Prezzo"])  //Specifica i campi dell'evento da mostrare
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