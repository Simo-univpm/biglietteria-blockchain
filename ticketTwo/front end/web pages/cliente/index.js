const AreaRiservata = require("./areaRiservata")

const ScrollView = require("../../HTML elements").Widgets.ScrollView

const FormMFA = require("../../HTML elements").Forms.MFA
const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente


module.exports = {

    AcquistaBiglietti: require("./acquistaBiglietti"),

    CatalogoEventi: class extends AreaRiservata{

        constructor(eventi,email){
    
            super(email).addChild(new ScrollView(eventi,(evento) => {

                evento.addPrice()   //Aggiunge il prezzo all'evento
                evento.addButton("Acquista ora","/acquista") //Aggiunge il pulsante per acquistare un biglietto
                evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
            })) 
        }
    },

    ListaBiglietti: class extends AreaRiservata{

        constructor(biglietti,email){

            super(email).addChild(new ScrollView(biglietti,(biglietto) => {

                biglietto.addTicketQRcode()
                biglietto.addData(["Artisti","Luogo","Data_evento","Orario","Prezzo","Organizzatore","Data_emissione","Orario_emissione"])   //Specifica i campi del biglietto da mostrare
                biglietto.addButton("Download biglietto","/tickets/download",true)
            },"Non hai ancora acquistato nessun biglietto",false),lista => lista.setProperty("padding-top","4vw")) 
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
    },

    Ticket: require("./ticket")
}