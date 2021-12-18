const Bar = require("../../HTML elements").Widgets.Bar
const HTMLpage = require("../../HTML elements").HTMLpage


class AreaRiservata extends HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(email){

        //Aggiunge la navigation bar al corpo (body) della pagina web
        
        super().addChild(new Bar(this.body),bar => {

            bar.addItem(email,"window.location.href='/users/profilo'");   //Aggiunge al menu a tendina della barra il pulsante per accedere all'area riservata
            bar.addItem("Cambia password","window.location.href='/users/modifica-password'"); 
            bar.addItem("Crea nuovo evento","window.location.href='/new-event'");   //Aggiunge al menu a tendina della barra il pulsante per creare un nuovo evento
            bar.addItem("Log out","logout()");  //Aggiunge al menu a tendina della barra il pulsante per effettuare il logout dall'area riservata
        })

    }

}


module.exports = AreaRiservata;