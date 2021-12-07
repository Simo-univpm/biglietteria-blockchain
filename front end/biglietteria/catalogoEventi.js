const ListaEventi = require("../listaEventi")
const AreaRiservata = require("./areaRiservata")


class CatalogoEventi extends AreaRiservata{

    constructor(eventi,email){

        super(email)    //Viene creato un tag di tipo div

        this.addChild(new ListaEventi(eventi,(evento)=>{
            if (evento.getStato() == 0)
                evento.addButton("Apri vendite","/annullatori") //Aggiunge il pulsante per aprire le vendite dei biglietti
            else{
                if (evento.getStato() == 1)
                    evento.addButton("Chiudi vendite","/api/events/chiudi-vendite") //Aggiunge il pulsante per aprire le vendite dei biglietti
                evento.addButton("Gestione biglietti","/biglietti")
                evento.addButton("Gestione ricevute","/ricevute")
                evento.addButton("Gestione ingressi","/ingressi")
            } 
            evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore","eventID","eventCreationDate","eventCreationTime","Prezzo"])  //Specifica i campi dell'evento da mostrare
        }))

    }

}



module.exports = CatalogoEventi;