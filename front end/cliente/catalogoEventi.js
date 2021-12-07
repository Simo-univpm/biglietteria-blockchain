const ListaEventi = require("../listaEventi")
const AreaRiservata = require("./areaRiservata")


class CatalogoEventi extends AreaRiservata{

    constructor(eventi,email){

        super(email)    //Viene creato un tag di tipo div

        this.addChild(new ListaEventi(eventi,(evento)=>{
            evento.addPrice()   //Aggiunge il prezzo all'evento
            evento.addButton("Acquista ora","/acquista") //Aggiunge il pulsante per acquistare un biglietto
            evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
        }))
        
    }

}



module.exports = CatalogoEventi;