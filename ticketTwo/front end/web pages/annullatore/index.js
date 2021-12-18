const HTMLpage = require("../../HTML elements").HTMLpage
const InvalidaBiglietti = require("./invalidaBiglietti")
const FormModificaPassword = require("../../HTML elements").Forms.ModificaPassword
const FormProfiloUtente = require("../../HTML elements").Forms.ProfiloUtente

module.exports = {

    InvalidaBiglietti: InvalidaBiglietti,

    ModificaPassword: class extends HTMLpage{

        constructor(){
            super().addChild(new FormModificaPassword())
        }
    },

    Profilo: class extends HTMLpage{

        constructor(email,userData){
            super().addChild(new FormProfiloUtente(userData),profilo => {

                profilo.addButton("Indietro","window.location.href='/tickets/annulla-biglietti'").setProperty("width","90%")
                profilo.addButton("Modifica password","window.location.href='/users/modifica-password'").setProperty("width","100%")
            })
        }
    }
}