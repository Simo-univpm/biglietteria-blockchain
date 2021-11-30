const HTMLpage = require("../HTMLpage")
const Form = require("../form")
const Widget = require("../widget")


class InvalidaBiglietti extends HTMLpage
{

    constructor(){

        super()
        this.addScript("'./jsQR.js'")
        this.addScript("scanner")
        this.addScript("logout")

        this.setBackground("InvalidaBiglietti.png")

        const form = new Form()
        form.setProperty("margin-top","180px")
        form.setProperty("margin-left","800px")
        form.setProperty("background-color","white")
        form.setProperty("width","500px")
        this.addChild(form)

        const scanner = new Widget("video")
        scanner.setAttribute("autoplay","true")
        scanner.setAttribute("onclick","scan(this)")
        scanner.setProperty("background-color","black")
        scanner.setProperty("width","80%")
        scanner.setProperty("height","40%")
        scanner.setProperty("margin-left","10%")
        scanner.setProperty("margin-bottom","20px")
        form.addChild(scanner)

        form.addInfoMessage("Biglietto non valido").setProperty("margin-left","36%")

        const profilo = form.addButton("'Il mio profilo'","window.location.href='/profilo'")
        profilo.setProperty("background-color","rgb(24,119,242)")
        profilo.setProperty("grid-column","span 2")

        const logout = form.addButton("Logout","logout()")
        logout.setProperty("grid-column","span 2")
    }

}


module.exports = InvalidaBiglietti;