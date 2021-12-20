const HTMLpage = require("../../HTML elements").HTMLpage

// Widgets

const Bar = require("../../HTML elements").Widgets.Bar
const ScrollView = require("../../HTML elements").Widgets.ScrollView


/*

Home page del sito. Contiene un catalogo con tutti gli eventi per cui sono in vendita i biglietti.
Disponibile alla rotta : "/"

Il costruttore richiede come parametro una lista i cui elementi sono gli eventi presenti nel database.

*/


class CatalogoEventi extends HTMLpage{

    constructor(eventi){

    
        //Aggiunge la navigation bar alla pagina HTML

        super().addChild(new Bar(this.body),bar => {

            bar.addItem("Accedi","window.location.href='/eventi?type=Cinema'") //Aggiunge il pulsante per il login al menu a tendina della barra
            bar.addItem("Registrati","window.location.href='/users/sign-in'") //Aggiunge il pulsante per il registrarsi al menu a tendina della barra
        }) 


        // Aggiunge una scrollview contenente tutti gli eventi del catalogo

        this.addChild(new ScrollView(eventi,evento => {

            evento.addPrice()   //Aggiunge il prezzo all'evento
            evento.addButton("Accedi e acquista","/acquista")    //Aggiunge il pulsante per accedere all'area riservata
            evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
        }))
        
    }

}


module.exports = CatalogoEventi;