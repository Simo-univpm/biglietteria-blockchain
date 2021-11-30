
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

        const scanner = profilo.addButton("Scanner biglietti","window.location.href='/annulla-biglietti'")
        scanner.setProperty("background-color","rgba(138,146,178,255)")
        scanner.setProperty("grid-column","span 2")

        const logout = profilo.addButton("Logout","logout()")
        logout.setProperty("background-color","rgba(138,146,178,255)")
        logout.setProperty("grid-column","span 2")

        this.addChild(profilo)
    } 
}

module.exports = Profilo;