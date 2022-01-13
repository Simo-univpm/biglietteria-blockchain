const AreaRiservata = require("./areaRiservata")
const AggiornaEvento = require("./aggiornaEvento")
const CancellaEvento = require("./cancellaEvento")
const CreaEvento = require("./creaEvento")

// Widgets

const Info = require("../../HTML elements").Widgets.Info
const ScrollView = require("../../HTML elements").Widgets.ScrollView
const Table = require("../../HTML elements").Widgets.Table

// Forms

const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormModificaProfiloUtente = require("../../HTML elements").Forms.ModificaProfiloUtente
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente

module.exports = {

    
    // Pagina web che permette di aggiornare i dati relativi ad un evento (solo se le vendite non sono ancora aperte)
    // Disponibile alla rotta : "/update-event"

    AggiornaEvento: AggiornaEvento,

    
    // Pagina web che permette di eliminare i dati relativi ad un evento (solo se le vendite non sono ancora aperte)
    // Disponibile alla rotta : "/delete-event"

    CancellaEvento: CancellaEvento,

    
    // Pagina web che permette di creare un nuovo evento
    // Disponibile alla rotta : "/new-event"

    CreaEvento: CreaEvento,

    
    // Home page del sito. Contiene un catalogo con tutti gli eventi creati dall'organizzazione dell'event manager'
    // Disponibile alla rotta : "/events"

    CatalogoEventi: class extends AreaRiservata{

        constructor(eventi,email){
    
            super(email).addChild(new ScrollView(eventi,(evento) => {
                
                // Pulsanti visualizzati quando le vendite dell'evento non sono ancora aperte

                if (!evento.getStato()){
                    evento.addButton("Modifica evento","/update-event")  //Aggiunge il pulsante per modificare un evento (solo se in biglietti non sono ancora in vendita)
                    evento.addButton("Elimina evento","/delete-event")  //Aggiunge il pulsante per cancellare un evento (solo se in biglietti non sono ancora in vendita)
                }

                // Pulsanti visualizzati dopo che le vendite dell'evento sono aperte

                else{
                    evento.addButton("Biglietti emessi","/tickets/biglietti")  //Aggiunge il pulsante per visualizzare i biglietti emessi per l'evento
                    if (evento.getStato() == 2) evento.addButton("Biglietti annullati","/tickets/ingressi")   //Aggiunge il pulsante per visualizzare gli ingressi all'evento (solo se le vendite sono chiuse)
                }

                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","eventID","eventCreationDate","eventCreationTime","Prezzo"])  //Specifica i campi dell'evento da mostrare
            }))
        }
    },

    
    // Pagina web contenente una lista di tutti i biglietti emessi per un certo evento
    // Disponibile alla rotta : "/tickets/biglietti"

    ListaBiglietti: class extends AreaRiservata
    {
    
        constructor(email,biglietti){

            super(email).addChild(biglietti.length ? new Table("Biglietti emessi per l'evento " + biglietti[0].eventID, biglietti,["userID","Data_emissione","Orario_emissione"]) : new Info("Nessun biglietto emesso per questo evento"))
        }
    },

    
    // Pagina web contenente una lista di tutti gli ingressi ad un dato evento
    // Disponibile alla rotta : "/tickets/ingressi"

    ListaIngressi: class extends AreaRiservata
    {

        constructor(email,ingressi){

            super(email).addChild(ingressi.length ? new Table("Ingressi relativi all'evento "+ingressi[0].eventID, ingressi, ["userID","Data_invalidazione","Orario_invalidazione"]) : new Info("Nessun cliente è ancora entrato all'evento"))
        }  
    },

    
    // Pagina web che permette di modificare la password dell'account
    // Disponibile alla rotta : "/users/modifica-password"

    ModificaPassword: class extends AreaRiservata{

        constructor(email){
            super(email).addChild(new FormModificaPassword())
        }
    },

    
    // Pagina web che permette di modificare il profilo di un utente
    // Disponibile alla rotta : "/users/modifica-profilo"

    ModificaProfilo: class extends AreaRiservata{

        constructor(email,userData){
            super(email).addChild(new FormModificaProfiloUtente(userData))
        }
    },
    
    
    // Pagina web che permette di visualizzare il profilo di un utente
    // Disponibile alla rotta : "/users/profilo"

    Profilo: class extends AreaRiservata{

        constructor(email,userData){
            super(email).addChild(new FormProfiloUtente(userData))
        }
    }
}
