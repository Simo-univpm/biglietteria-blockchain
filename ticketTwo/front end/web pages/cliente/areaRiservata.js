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
            bar.addItem("I miei biglietti","window.location.href='/tickets/mytickets'");    //Se l'utente è un cliente, aggiunge al menu a tendina della barra il pulsante per vedere i biglietti acquistati
            bar.addItem("Log out","logout()");  //Aggiunge al menu a tendina della barra il pulsante per effettuare il logout dall'area riservata
        }); 
    }

}


module.exports = AreaRiservata;