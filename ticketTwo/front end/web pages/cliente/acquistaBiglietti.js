const AreaRiservata = require("./areaRiservata")

// Widgets

const Card = require("../../HTML elements").Widgets.Card
const Form = require("../../HTML elements").Widgets.Form
const Info = require("../../HTML elements").Widgets.Info


/*La classe implementa una pagina web contenente un semplice form che permette di modificare i privilegi di un utente.
Le modifiche sono permesse solo se l'utente ha privilegi da cliente.

Il form contiene due campi:
    - uno per inserire la l'email dell'utente a cui concedere maggiori privilegi,
    - uno per inserire il nome della società di appartenenza (solo se l'utente è un event manager).

In fondo al form c'è un pulsante per inviare i dati al server e modificare i privilegi

Il costruttore richiede come parametro la mail dell'utente della biglietteria.

*/


class AcquistaBiglietti extends AreaRiservata{
    

    constructor(email,data){

        //Invoca il costruttore della superclasse per generare una pagina web

        super(email)  


        //Aggiunge un form alla pagina web

        typeof data != 'string' ? this.addChild(new Form("/api/tickets","POST"),form => {

            //Margini dall'alto

            form.setProperty("margin-top","4vw")  


            //Aggiunge il logo al form

            form.addLogo("Acquista biglietti")


            //Aggiunge il riquadro con i dati dell'evento
            
            form.addChild(new Card(data),evento => {

                // Imposta le proprietà CSS del riquadro

                evento.setProperty("margin-top","2.6vw") //Margini dall'alto
                evento.setProperty("margin-bottom","3.6vw")  //Margini dal basso
                evento.setProperty("margin-left","0") //Margini da sinistra
                evento.setProperty("width","50vw")


                //Aggiunge il prezzo

                evento.addPrice() 


                //Aggiunge un campo per selezionare il numero di biglietti da acquistare

                evento.addNumberTicketField() 


                //Specifica i campi da visulizzare

                evento.addData(["Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"]) 
            }) 


            // Aggiunge una casella di testo per inserire la password del wallet di un cliente

            form.addField("Password wallet","password")
            

            //Aggiunge i radio buttons per selezionare il metodo di pagamento al form

            form.addRadioButtons("metodo_pagamento",["paypal","visa","mastercard"],"paypal",true)


            //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

            form.addInfoMessage()  


            //Aggiunge il pulsante per acquistare i biglietti

            form.addButton("Acquista")  
            
        }) : this.addChild(new Info("Le vendite dei biglietti per questo evento sono chiuse"))
    }
}



module.exports = AcquistaBiglietti;