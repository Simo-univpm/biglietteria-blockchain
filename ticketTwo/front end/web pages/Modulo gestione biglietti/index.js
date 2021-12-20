const AreaRiservata = require("./areaRiservata")

// Widgets

const Info = require("../../HTML elements").Widgets.Info
const ScrollView = require("../../HTML elements").Widgets.ScrollView
const Table = require("../../HTML elements").Widgets.Table

// Forms

const FormMFA = require("../../HTML elements").Forms.MFA
const FormGestioneVendite = require("../../HTML elements").Forms.GestioneVendite
const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormModificaProfiloUtente = require("../../HTML elements").Forms.ModificaProfiloUtente
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente

module.exports = {
    
    // Pagina web per aprire le vendite dei biglietti per un evento
    // Disponibile alla rotta : "/apri-vendite"

    ApriVendite: class extends AreaRiservata
    {
        constructor(email,eventID,annullatore){
    
            super(email).addChild(new FormGestioneVendite("Apri vendite",eventID,annullatore))
        } 
    },
    
    
    // Pagina web per concedere privilegi ad un account
    // Disponibile alla rotta : "/users/grant-privileges"

    ConcediPrivilegi: require("./concediPrivilegi"),

    
    // Home page del sito. Contiene un catalogo con tutti gli eventi presenti nel database
    // Disponibile alla rotta : "/events"

    CatalogoEventi: class extends AreaRiservata{

        constructor(eventi,email){
    
            super(email).addChild(new ScrollView(eventi,(evento) => {

                // Pulsanti visualizzati quando le vendite dell'evento non sono ancora aperte

                if (!evento.getStato()) evento.addButton("Apri vendite","/users/annullatori") //Aggiunge il pulsante per aprire le vendite dei biglietti

                // Pulsanti visualizzati dopo che le vendite dell'evento sono aperte
                
                else{
                    if (evento.getStato() == 1) evento.addButton("Chiudi vendite","/chiudi-vendite") //Aggiunge il pulsante per chiudere le vendite dei biglietti (solo se le vendite sono aperte)
                    evento.addButton("Gestione biglietti","/tickets/biglietti")     //Aggiunge il pulsante per visualizzare i biglietti emessi per l'evento
                    evento.addButton("Gestione ricevute","/tickets/ricevute")       //Aggiunge il pulsante per visualizzare le ricevute emesse per l'evento
                    if (evento.getStato() == 2) evento.addButton("Gestione ingressi","/tickets/ingressi")    //Aggiunge il pulsante per visualizzare gli ingressi all'evento (solo se le vendite sono chiuse)
                }
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore","eventID","eventCreationDate","eventCreationTime","Prezzo","Indirizzo_contratto"])  //Specifica i campi dell'evento da mostrare
            }))
        }
    },

    
    // Pagina web per chiudere le vendite dei biglietti di un certo evento
    // Disponibile alla rotta : "/chiudi-vendite"

    ChiudiVendite: class extends AreaRiservata
    {
        constructor(email,eventID){
    
            super(email).addChild(new FormGestioneVendite("Chiudi vendite",eventID))
        } 
    },

    
    // Pagina web contenente una lista di tutti gli accessi al sito web
    // Disponibile alla rotta : "/users/accessi"

    ListaAccessi: class extends AreaRiservata
    {
    
        constructor(email,accessi){

            super(email).addChild(accessi.length ? new Table("Lista degli accessi al sito web".eventID, accessi,["Mail","Data_accesso","Orario_accesso"]) : new Info("Nessun utente ha effettuato accessi al sito web"))
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

    
    // Pagina web contenente una lista di tutti gli annullatori registrati al sito
    // Disponibile alla rotta : "/users/annullatori"

    ListaAnnullatori: class extends AreaRiservata
    {
        constructor(email,eventID,annullatori){

            super(email).addChild(annullatori.length ? new Table("Seleziona un annullatore per l'evento "+eventID, annullatori, ["Nome","Cognome","Telefono","Mail","Indirizzo wallet","Genere"],"window.location.href='/apri-vendite?id="+eventID+"&annullatore='+this.childNodes[4].textContent") : new Info("Nessun annullatore disponibile"))
        } 
    },

    
    // Pagina web contenente una lista di tutte le ricevute emesse per un dato evento
    // Disponibile alla rotta : "/tickets/ricevute"

    ListaRicevute: class extends AreaRiservata
    {

        constructor(email,ricevute){

            super(email).addChild(ricevute.length ? new Table("Ricevute emesse per l'evento "+ricevute[0].eventID, ricevute, ["Nome","Cognome","Numero_biglietti","Data_emissione","Orario_emissione","Codice_ricevuta","Via","Città","Stato","CAP","Email"]) : new Info("Nessuna ricevuta emessa per questo evento"))
        }  
    },

    
    // Pagina web contenente una lista di tutti gli utenti registrati al sito web
    // Disponibile alla rotta : "/users"

    ListaUtenti: class extends AreaRiservata
    {
        constructor(email,utenti){

            super(email).addChild(utenti.length ? new Table("Utenti registrati a ticketTwo", utenti, ["Nome","Cognome","Privilegi","Telefono","Mail","Data di nascita","Genere"]) : new Info("Nessun utente registrato"))
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
    }
}