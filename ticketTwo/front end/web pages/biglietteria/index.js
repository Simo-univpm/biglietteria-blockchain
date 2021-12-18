const AreaRiservata = require("./areaRiservata")

const Info = require("../../HTML elements").Widgets.Info
const ScrollView = require("../../HTML elements").Widgets.ScrollView
const Table = require("../../HTML elements").Widgets.Table

const FormMFA = require("../../HTML elements").Forms.MFA
const FormGestioneVendite = require("../../HTML elements").Forms.GestioneVendite
const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente

module.exports = {

    ApriVendite: class extends AreaRiservata
    {
        constructor(email,eventID,annullatore){
    
            super(email).addChild(new FormGestioneVendite("Apri vendite",eventID,annullatore))
        } 
    },
    
    ConcediPrivilegi: require("./concediPrivilegi"),

    CatalogoEventi: class extends AreaRiservata{

        constructor(eventi,email){
    
            super(email).addChild(new ScrollView(eventi,(evento) => {

                if (!evento.getStato()) evento.addButton("Apri vendite","/users/annullatori") //Aggiunge il pulsante per aprire le vendite dei biglietti
                else{
                    if (evento.getStato() == 1) evento.addButton("Chiudi vendite","/chiudi-vendite") //Aggiunge il pulsante per aprire le vendite dei biglietti
                    evento.addButton("Gestione biglietti","/tickets/biglietti")
                    evento.addButton("Gestione ricevute","/tickets/ricevute")
                    if (evento.getStato() == 2) evento.addButton("Gestione ingressi","/tickets/ingressi")
                }
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore","eventID","eventCreationDate","eventCreationTime","Prezzo","Indirizzo_contratto"])  //Specifica i campi dell'evento da mostrare
            }))
        }
    },

    ChiudiVendite: class extends AreaRiservata
    {
        constructor(email,eventID){
    
            super(email).addChild(new FormGestioneVendite("Chiudi vendite",eventID))
        } 
    },

    ListaAccessi: class extends AreaRiservata
    {
    
        constructor(email,accessi){

            super(email).addChild(accessi.length ? new Table("Lista degli accessi al sito web".eventID, accessi,["Mail","Data_accesso","Orario_accesso"]) : new Info("Nessun utente ha effettuato accessi al sito web"))
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

    ListaAnnullatori: class extends AreaRiservata
    {
        constructor(email,eventID,annullatori){

            super(email).addChild(annullatori.length ? new Table("Seleziona un annullatore per l'evento "+eventID, annullatori, ["Nome","Cognome","Telefono","Mail","Indirizzo wallet","Genere"],"window.location.href='/apri-vendite?id="+eventID+"&annullatore='+this.childNodes[4].textContent") : new Info("Nessun annullatore disponibile"))
        } 
    },

    ListaRicevute: class extends AreaRiservata
    {

        constructor(email,ricevute){

            super(email).addChild(ricevute.length ? new Table("Ricevute emesse per l'evento "+ricevute[0].eventID, ricevute, ["Nome","Cognome","Numero_biglietti","Data_emissione","Orario_emissione","Codice_ricevuta","Via","Città","Stato","CAP","Email"]) : new Info("Nessuna ricevuta emessa per questo evento"))
        }  
    },

    ListaUtenti: class extends AreaRiservata
    {
        constructor(email,utenti){

            super(email).addChild(utenti.length ? new Table("Utenti registrati a ticketTwo", utenti, ["Nome","Cognome","Privilegi","Telefono","Mail","Data di nascita","Genere"]) : new Info("Nessun utente registrato"))
        } 
    },

    MFA: class extends AreaRiservata{

        constructor(email,redirect_url){
            super(email).addChild(new FormMFA(redirect_url))
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