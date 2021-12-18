const AreaRiservata = require("./areaRiservata")
const AggiornaEvento = require("./aggiornaEvento")
const CancellaEvento = require("./cancellaEvento")
const CreaEvento = require("./creaEvento")

const Info = require("../../HTML elements").Widgets.Info
const ScrollView = require("../../HTML elements").Widgets.ScrollView
const Table = require("../../HTML elements").Widgets.Table

const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente

module.exports = {

    AggiornaEvento: AggiornaEvento,
    CancellaEvento: CancellaEvento,
    CreaEvento: CreaEvento,

    CatalogoEventi: class extends AreaRiservata{

        constructor(eventi,email){
    
            super(email).addChild(new ScrollView(eventi,(evento) => {
                
                if (!evento.getStato()){
                    evento.addButton("Modifica evento","/update-event")  //Aggiunge il pulsante per modificare un evento (solo se in biglietti non sono ancora in vendita)
                    evento.addButton("Elimina evento","/delete-event")  //Aggiunge il pulsante per cancellare un evento (solo se in biglietti non sono ancora in vendita)
                }
                else{
                    evento.addButton("Gestione biglietti","/tickets/biglietti")
                    if (evento.getStato() == 2) evento.addButton("Gestione ingressi","/tickets/ingressi")
                }
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","eventID","eventCreationDate","eventCreationTime","Prezzo"])  //Specifica i campi dell'evento da mostrare
            }))
        }
    },

    ListaBiglietti: class extends AreaRiservata
    {
    
        constructor(email,biglietti){

            super(email).addChild(biglietti.length ? new Table("Biglietti emessi per l'evento " + biglietti[0].eventID, biglietti,["userID","Data_emissione","Orario_emissione"]) : new Info("Nessun biglietto emesso per questo evento"))
        }
    },

    ListaIngressi: class extends AreaRiservata
    {

        constructor(email,ingressi){

            super(email).addChild(ingressi.length ? new Table("Ingressi relativi all'evento "+ingressi[0].eventID, ingressi, ["userID","Data_invalidazione","Orario_invalidazione"]) : new Info("Nessun cliente è ancora entrato all'evento"))
        }  
    },

    ModificaPassword: class extends AreaRiservata{

        constructor(email){
            super(email).addChild(new FormModificaPassword())
        }
    },

    Profilo: class extends AreaRiservata{

        constructor(email,userData){
            super(email).addChild(new FormProfiloUtente(userData))
        }
    }
}
