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
        form.setProperty("margin-top","12vw")
        form.setProperty("margin-left","60vw")
        form.setProperty("background-color","white")
        form.setProperty("width","32vw")
        this.addChild(form)

        const scanner = new Widget("video")
        scanner.setAttribute("autoplay","true")
        scanner.setAttribute("onclick","scan(this)")
        scanner.setProperty("background-color","black")
        scanner.setProperty("width","26vw")
        scanner.setProperty("height","20vw")
        scanner.setProperty("margin-left","3vw")
        form.addChild(scanner)

        form.addInfoMessage("Biglietto non valido")

        form.addButton("'Il mio profilo'","window.location.href='/profilo'").setProperty("grid-column","span 2")
        form.addButton("Logout","logout()").setProperty("grid-column","span 2")
    }

}


module.exports = InvalidaBiglietti;