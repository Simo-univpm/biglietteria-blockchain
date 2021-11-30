const Bar = require("../bar")
const HTMLpage = require("../HTMLpage")


class AreaRiservata extends HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(email){

        super()
        this.addScript("bar")
        this.addScript("logout")
        
        const bar = new Bar(this.body); //Viene creato un oggetto di tipo Bar (navigation bar della pagina web)
        bar.addItem(email,"window.location.href='/profilo'");   //Aggiunge al menu a tendina della barra il pulsante per accedere all'area riservata
        bar.addItem("Crea nuovo evento","window.location.href='/new-event'");   //Aggiunge al menu a tendina della barra il pulsante per creare un nuovo evento
        bar.addItem("Log out","logout()");  //Aggiunge al menu a tendina della barra il pulsante per effettuare il logout dall'area riservata
        this.addChild(bar); //Aggiunge la navigation bar al corpo (body) della pagina web

    }

}


module.exports = AreaRiservata;