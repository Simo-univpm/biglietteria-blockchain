const AreaRiservata = require("./areaRiservata")

// Widgets

const ScrollView = require("../../HTML elements").Widgets.ScrollView

// Forms

const FormMFA = require("../../HTML elements").Forms.MFA
const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormModificaProfiloUtente = require("../../HTML elements").Forms.ModificaProfiloUtente
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente


module.exports = {

    
    // Pagina web in cui è possibile acquistare i biglietti per un evento
    // Disponibile alla rotta : "/acquista"

    AcquistaBiglietti: require("./acquistaBiglietti"),

    
    // Home page del sito. Contiene un catalogo con tutti gli eventi per cui i biglietti sono in vendita
    // Disponibile alla rotta : "/events"

    CatalogoEventi: class extends AreaRiservata{

        constructor(eventi,email){
    
            super(email).addChild(new ScrollView(eventi,(evento) => {

                evento.addPrice()   //Aggiunge il prezzo all'evento
                evento.addButton("Acquista ora","/acquista")    //Aggiunge il pulsante per acquistare un biglietto
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
            })) 
        }
    },

    
    // Pagina web in cui sono disponibili tutti i biglietti acquistati dall'utente
    // Disponibile alla rotta : "/tickets/mytickets"

    ListaBiglietti: class extends AreaRiservata{

        constructor(biglietti,email){

            super(email).addChild(new ScrollView(biglietti,(biglietto) => {

                biglietto.addTicketQRcode()
                biglietto.addData(["Artisti","Luogo","Data_evento","Orario","Prezzo","Organizzatore","Data_emissione","Orario_emissione"])   //Specifica i campi del biglietto da mostrare
                biglietto.addButton("Download biglietto","/tickets/download",true)
            },"Non hai ancora acquistato nessun biglietto",false),lista => lista.setProperty("padding-top","4vw")) 
        }
    },

    
    // Pagina web che viene mostrata al momento dell'autenticazione a due fattori
    // Ha lo stesso url della pagina web protetta da autenticazione a due fattori

    MFA: class extends AreaRiservata{

        constructor(email,redirect_url){
            super(email).addChild(new FormMFA(redirect_url))
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
    },

    Ticket: require("./ticket")
}