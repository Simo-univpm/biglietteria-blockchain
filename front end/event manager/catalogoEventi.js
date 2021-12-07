const ListaEventi = require("../listaEventi")
const AreaRiservata = require("./areaRiservata")


class CatalogoEventi extends AreaRiservata{

    constructor(eventi,email){

        super(email)    //Viene creato un tag di tipo div

        this.addChild(new ListaEventi(eventi,(evento)=>{
            if (evento.getStato()==0){
                evento.addButton("Modifica evento","/update-event")  //Aggiunge il pulsante per modificare un evento (solo se in biglietti non sono ancora in vendita)
                evento.addButton("Elimina evento","/delete-event")  //Aggiunge il pulsante per cancellare un evento (solo se in biglietti non sono ancora in vendita)
            }
            else{
                evento.addButton("Gestione biglietti","/biglietti")
                evento.addButton("Gestione ingressi","/ingressi")
            }
            evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","eventID","eventCreationDate","eventCreationTime","Prezzo"])  //Specifica i campi dell'evento da mostrare
        }))

    }

}



module.exports = CatalogoEventi;