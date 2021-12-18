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
            bar.addItem("Concedi privilegi","window.location.href='/users/grant-privileges'");   //Se l'utente è un membro dello staff della biglietteria, aggiunge al menu a tendina della barra il pulsante per concedere privilegi agli utenti
            bar.addItem("Lista degli accessi","window.location.href='/users/accessi'");   //Se l'utente è un membro dello staff della biglietteria, aggiunge al menu a tendina della barra il pulsante per accedere lista degli accessi
            bar.addItem("Visualizza utenti","window.location.href='/users'");   //Se l'utente è un membro dello staff della biglietteria, aggiunge al menu a tendina della barra il pulsante per accedere lista degli utenti iscritti
            bar.addItem("Log out","logout()");  //Aggiunge al menu a tendina della barra il pulsante per effettuare il logout dall'area riservata
        }); 
    }
}


module.exports = AreaRiservata;