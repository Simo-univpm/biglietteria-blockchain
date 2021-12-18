const Bar = require("../../HTML elements").Widgets.Bar
const HTMLpage = require("../../HTML elements").HTMLpage

const ScrollView = require("../../HTML elements").Widgets.ScrollView


class CatalogoEventi extends HTMLpage{

    constructor(eventi,email){

        //Aggiunge la navigation bar alla pagina HTML

        super(email).addChild(new Bar(this.body),bar => {

            bar.addItem("Accedi","window.location.href='/eventi?type=Cinema'") //Aggiunge il pulsante per il login al menu a tendina della barra
            bar.addItem("Registrati","window.location.href='/users/sign-in'") //Aggiunge il pulsante per il registrarsi al menu a tendina della barra
        }) 

        this.addChild(new ScrollView(eventi,(evento)=>{
            evento.addPrice()   //Aggiunge il prezzo all'evento
            evento.addButton("Accedi e acquista","/acquista")    //Aggiunge il pulsante per accedere all'area riservata
            evento.addData(["Artisti","Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"])   //Specifica i campi dell'evento da mostrare
        }))
        
    }

}


module.exports = CatalogoEventi;