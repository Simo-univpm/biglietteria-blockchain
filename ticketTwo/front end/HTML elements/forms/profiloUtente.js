const Form = require("../widgets/form")
const Widget = require("../widget")


class ProfiloUtente extends Form
{
    //Viene creata una pagina HTML generica

    constructor(userData){

        super("/api/users","PATCH","/users/profilo")
        this.addScript("profiloUtente")
        this.setProperty("margin-top","2vw")

        this.addLogo("Il mio profilo").setProperty("grid-column","span 2")  //Aggiunge il logo al form

        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","26% 74%") //Lunghezze delle colonne della griglia

        new Array("Privilegi","Mail","Genere","Nome","Cognome","Data di nascita","Telefono","Indirizzo wallet").forEach(campo => {

            this.addChild(new Widget("h3",campo+": "),widget => widget.setProperty("color","rgba(138,146,178,255)"))
            this.addChild(new Widget("object",userData[campo.replaceAll(" ","_")]),valore => {

                valore.setAttribute("id",campo.replaceAll(" ","_"))
                valore.setAttribute("name","field")
                valore.setProperty("margin-top","1.5vw")
            })
        })

        this.addInfoMessage().setProperty("grid-column","span 2")
        this.addButton("Modifica profilo","modificaProfilo()").setProperty("grid-column","span 2")
        const submit_button = this.addButton("Salva modifiche")
        submit_button.setProperty("grid-column","span 2")
        submit_button.setProperty("display","none")
    }  
}

module.exports = ProfiloUtente;