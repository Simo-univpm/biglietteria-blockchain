const HTMLpage = require("../../HTML elements").HTMLpage
const InvalidaBiglietti = require("./invalidaBiglietti")

// Forms

const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormModificaProfiloUtente = require("../../HTML elements").Forms.ModificaProfiloUtente
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente

module.exports = {

    // Pagina web per scansionare i QR code dei biglietti
    // Disponibile alla rotta : "/tickets/annulla-biglietti"

    InvalidaBiglietti: InvalidaBiglietti,

    
    // Pagina web per modificare la password dell'account
    // Disponibile alla rotta : "/users/modifica-password"

    ModificaPassword: class extends HTMLpage{

        constructor(){
            super().addChild(new FormModificaPassword())
        }
    },

    
    // Pagina web per modificare il profilo utente
    // Disponibile alla rotta : "/users/modifica-profilo"

    ModificaProfilo: class extends HTMLpage{

        constructor(email,userData){
            super(email).addChild(new FormModificaProfiloUtente(userData))
        }
    },

    
    // Pagina web per visualizzare i dati del profilo di un utente
    // Disponibile alla rotta : "/users/profilo"

    Profilo: class extends HTMLpage{

        constructor(email,userData){
            super().addChild(new FormProfiloUtente(userData),profilo => {

                profilo.addButton("Indietro","window.location.href='/tickets/annulla-biglietti'").setProperty("width","90%")
                profilo.addButton("Modifica password","window.location.href='/users/modifica-password'").setProperty("width","100%")
            })
        }
    }
}