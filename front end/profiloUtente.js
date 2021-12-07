const Form = require("./form")
const Widget = require("./widget")


class ProfiloUtente extends Form
{
    //Viene creata una pagina HTML generica

    constructor(userData){
        super("'javascript: modificaProfilo(this)'")
        this.setProperty("margin-top","2vw")

        this.addLogo("Profilo.png").setProperty("grid-column","span 2")  //Aggiunge il logo al form

        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","26% 74%") //Lunghezze delle colonne della griglia

        const campi = ["Privilegi","Mail","Nome","Cognome","Data di nascita","Genere","Telefono","Indirizzo wallet"]

        for (let i=0; i<campi.length; i++){
            
            const campo = new Widget("h3",campi[i]+": ")
            campo.setProperty("color","rgba(138,146,178,255)")
            this.addChild(campo)

            const valore = new Widget("object",userData[campi[i].replaceAll(" ","_")])
            valore.setAttribute("id",campi[i].replaceAll(" ","_"))
            valore.setAttribute("name","valore")
            valore.setProperty("margin-top","1.5vw")
            this.addChild(valore)
        }

        this.addInfoMessage("I dati inseriti non sono validi").setProperty("grid-column","span 2")

        const button = this.addButton("'Modifica profilo'")
        button.setAttribute("id","modifica_profilo")
        button.setProperty("grid-column","span 2")

    }
    
}

module.exports = ProfiloUtente;