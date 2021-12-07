
const HTMLpage = require("../HTMLpage")
const ProfiloUtente = require("../ProfiloUtente")


class Profilo extends HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(userData){
        super(userData.Mail)
        this.addScript("form")
        this.addScript("profilo")
        this.addScript("logout")

        const profilo = new ProfiloUtente(userData)

        profilo.addButton("'Indietro'","window.location.href='/annulla-biglietti'").setProperty("width","90%")

        profilo.addButton("'Modifica password'","window.location.href='/modifica-password'").setProperty("width","100%")

        this.addChild(profilo)
    } 
}

module.exports = Profilo;