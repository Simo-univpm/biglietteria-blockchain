const Form = require("./form")
const Widget = require("./widget")




class ProfiloUtente extends Form
{
    //Viene creata una pagina HTML generica

    constructor(userData){
        super("'javascript: modificaProfilo(this)'")
        this.setProperty("margin-top","60px")

        const logo = new Widget("img")  //Crea un nuovo tag di tipo img
        logo.setAttribute("src","Profilo.png")  //Imposta la sorgente dell'immagine
        logo.setProperty("width","50%") //Lunghezza dell'immagine
        logo.setProperty("margin-bottom","20px")  //Margini dal basso
        logo.setProperty("grid-column","span 2")
        this.addChild(logo) //Aggiunge il logo al form

        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","26% 74%") //Lunghezze delle colonne della griglia

        const campi = ["Privilegi","Mail","Nome","Cognome","Data di nascita","Genere","Telefono"]

        for (let i=0; i<campi.length; i++){
            const campo = new Widget("h3",campi[i]+": ")
            campo.setProperty("color","rgba(138,146,178,255)")
            this.addChild(campo)
            const valore = new Widget("object",userData[campi[i].replaceAll(" ","_")])
            valore.setAttribute("id",campi[i].replaceAll(" ","_"))
            valore.setAttribute("name","valore")
            valore.setProperty("margin-top","22px")
            this.addChild(valore)
        }

        const info = this.addInfoMessage("I dati inseriti non sono validi")
        info.setProperty("margin-left","36%") //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        info.setProperty("grid-column","span 2")

        const button = this.addButton("'Modifica profilo'")
        button.setAttribute("id","modifica_profilo")
        button.setProperty("background-color","rgba(138,146,178,255)")
        button.setProperty("grid-column","span 2")

    }
    
}

module.exports = ProfiloUtente;