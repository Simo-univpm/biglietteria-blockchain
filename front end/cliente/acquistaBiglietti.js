const Form = require("../form")
const Event = require("../event")
const AreaRiservata = require("./areaRiservata")
const Widget = require("../widget")



class AcquistaBiglietti extends AreaRiservata{
    

    constructor(email,data){

        super(email)  //Invoca il costruttore della superclasse.
        this.addScript("buyTicket")

        const form = new Form("'javascript: buyTicket()'")  //Crea un nuovo form
        form.setProperty("margin-top","80px")  //Margini dall'alto
        form.setProperty("margin-left","300px") //Margini da sinistra
        form.setProperty("width","800px") //Lunghezza

        const logo = new Widget("img")  //Crea un nuovo tag di tipo img
        logo.setAttribute("src","BuyTicket.png")  //Imposta la sorgente dell'immagine
        logo.setProperty("width","50%") //Lunghezza dell'immagine
        form.addChild(logo) //Aggiunge il logo al form

        //Riquadro con i dati dell'evento
        
        const evento = new Event(data) //Crea un nuovo evento (widget)
        evento.setProperty("margin-top","40px") //Margini dall'alto
        evento.setProperty("margin-bottom","60px")  //Margini dal basso
        evento.setProperty("margin-left","0") //Margini da sinistra
        evento.addPrice() //Aggiunge il prezzo
        evento.addNumberTicketField() //Aggiunge un campo per selezionare il numero di biglietti da acquistare
        evento.addData(["Luogo","Data_Evento","Posti_disponibili","Orario","Organizzatore"]) //Specifica i campi da visulizzare
        form.addChild(evento) //Aggiunge l'evento al form

        //Radio buttons per i metodi di pagamento

        const pay_methods_type = ["paypal","visa","mastercard"] //Metodi di pagamento
        const pay_methods = []

        //Per ogni metodo di pagamento crea il corrsipondente radio button

        for (let i=0;i< pay_methods_type.length; i+=1){
            const pay_method = new Widget("img")  //Crea un tag di tipo img
            pay_method.setAttribute("src",pay_methods_type[i]+".png") //Imposta la sorgente dell'immagine
            pay_method.setAttribute("width","60px") //Imposta la lunghezza
            pay_methods.push(pay_method.get())  //Aggiunge l'elemento alla lista
        }

        const radio_buttons = form.addRadioButtons("metodi_pagamento",pay_methods)  //Aggiunge i radio buttons al form
        radio_buttons.setProperty("margin-left","160px")  //Margini da sinistra

        //Messaggio informativo

        const info = form.addInfoMessage("Il metodo di pagamento selezionato non è disponibile")  //Aggiunge un oggetto che visualizza un messaggio informativo in caso di errore
        info.setProperty("margin-left","190px") //Margini da sinistra
        info.setProperty("color","var(--tema)") //Colore del testo

        const button = form.addButton("Acquista")  //Aggiunge il pulsante per acquistare i biglietti al form
        button.setProperty("background-color","var(--tema)")
        button.setProperty("margin-top","40px")

        this.addChild(form)
    }
}



module.exports = AcquistaBiglietti;