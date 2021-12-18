const Card = require("../../HTML elements").Widgets.Card
const Form = require("../../HTML elements").Widgets.Form
const Info = require("../../HTML elements").Widgets.Info
const AreaRiservata = require("./areaRiservata")



class AcquistaBiglietti extends AreaRiservata{
    

    constructor(email,data){

        super(email)  //Invoca il costruttore della superclasse.

        //Aggiunge un form alla pagina web

        typeof data != 'string' ? this.addChild(new Form("/api/tickets","POST"),form => {

            form.setProperty("margin-top","4vw")  //Margini dall'alto
            form.addLogo("Acquista biglietti") //Aggiunge il logo al form

            //Aggiunge il riquadro con i dati dell'evento
            
            form.addChild(new Card(data),evento => {

                evento.setProperty("margin-top","2.6vw") //Margini dall'alto
                evento.setProperty("margin-bottom","3.6vw")  //Margini dal basso
                evento.setProperty("margin-left","0") //Margini da sinistra
                evento.setProperty("width","50vw")

                evento.addPrice() //Aggiunge il prezzo
                evento.addNumberTicketField() //Aggiunge un campo per selezionare il numero di biglietti da acquistare
                evento.addData(["Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"]) //Specifica i campi da visulizzare
            }) 

            form.addField("Password wallet","password")
            
            //Aggiunge i radio buttons per selezionare il metodo di pagamento al form

            form.addRadioButtons("metodo_pagamento",["paypal","visa","mastercard"],true)  //Aggiunge i radio buttons al form
            form.addInfoMessage()  //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
            form.addButton("Acquista")  //Aggiunge il pulsante per acquistare i biglietti al form
        }) : this.addChild(new Info("Le vendite dei biglietti per questo evento sono chiuse"))
    }
}



module.exports = AcquistaBiglietti;