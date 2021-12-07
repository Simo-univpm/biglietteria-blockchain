const Form = require("../form")
const Event = require("../event")
const AreaRiservata = require("./areaRiservata")
const Widget = require("../widget")



class AcquistaBiglietti extends AreaRiservata{
    

    constructor(email,data){

        super(email)  //Invoca il costruttore della superclasse.
        this.addScript("buyTicket")

        const form = new Form("'javascript: buyTicket()'")  //Crea un nuovo form
        form.setProperty("margin-top","4vw")  //Margini dall'alto

        form.addLogo("BuyTicket.png") //Aggiunge il logo al form

        //Riquadro con i dati dell'evento
        
        const evento = new Event(data) //Crea un nuovo evento (widget)
        evento.setProperty("margin-top","2.6vw") //Margini dall'alto
        evento.setProperty("margin-bottom","3.6vw")  //Margini dal basso
        evento.setProperty("margin-left","0") //Margini da sinistra
        evento.setProperty("width","50vw")
        evento.addPrice() //Aggiunge il prezzo
        evento.addNumberTicketField() //Aggiunge un campo per selezionare il numero di biglietti da acquistare
        evento.addData(["Luogo","Data_evento","Posti_disponibili","Orario","Organizzatore"]) //Specifica i campi da visulizzare
        form.addChild(evento) //Aggiunge l'evento al form

        //Radio buttons per i metodi di pagamento

        const pay_methods_type = ["paypal","visa","mastercard"] //Metodi di pagamento
        const pay_methods = []

        //Per ogni metodo di pagamento crea il corrsipondente radio button

        for (let i=0;i< pay_methods_type.length; i+=1){
            const pay_method = new Widget("img")  //Crea un tag di tipo img
            pay_method.setAttribute("src",pay_methods_type[i]+".png") //Imposta la sorgente dell'immagine
            pay_method.setProperty("width","4.6vw") //Imposta la lunghezza
            pay_methods.push(pay_method.get())  //Aggiunge l'elemento alla lista
        }

        form.addRadioButtons("metodi_pagamento",pay_methods)  //Aggiunge i radio buttons al form

        form.addInfoMessage("Il metodo di pagamento selezionato non è disponibile")  //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore

        form.addButton("Acquista")  //Aggiunge il pulsante per acquistare i biglietti al form


        this.addChild(form)
    }
}



module.exports = AcquistaBiglietti;