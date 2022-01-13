const Bar = require("../../HTML elements").Widgets.Bar
const HTMLpage = require("../../HTML elements").HTMLpage



/*La classe implementa l'area riservata della biglietteria. Non è altro che una semplice
pagina web a cui viene aggiunta una navigation bar e un menu a tendina con tutte le
operazioni disponibili per lo staff della biglietteria.

Come le altre pagine web, l'area riservata può essere personalizzata aggiungendo widget.

Il costruttore richiede come parametro la mail dell'utente (viene visualizzata nel menu a tendina).

*/


class AreaRiservata extends HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(email){

        //Aggiunge la navigation bar al corpo (body) della pagina web
        
        super().addChild(new Bar(this.body),bar => {

            bar.addItem(email,"window.location.href='/users/profilo'");   //Aggiunge al menu a tendina della barra il pulsante per visualizzare il proprio profilo
            bar.addItem("Cambia password","window.location.href='/users/modifica-password'");   //Aggiunge al menu a tendina della barra il pulsante per modificare la password dell'account
            bar.addItem("Concedi privilegi","window.location.href='/users/grant-privileges'");   //Aggiunge al menu a tendina della barra il pulsante per concedere privilegi agli utenti
            bar.addItem("Lista degli accessi","window.location.href='/users/accessi'");   //Aggiunge al menu a tendina della barra il pulsante per accedere lista degli accessi
            bar.addItem("Visualizza utenti","window.location.href='/users'");   //Aggiunge al menu a tendina della barra il pulsante per accedere lista degli utenti iscritti
            bar.addItem("Log out","logout()");  //Aggiunge al menu a tendina della barra il pulsante per effettuare il logout dall'area riservata
        }); 
    }
}


module.exports = AreaRiservata;