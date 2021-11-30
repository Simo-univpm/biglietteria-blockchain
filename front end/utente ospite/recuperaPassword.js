const Form = require("../form")
const HTMLpage = require("../HTMLpage")
const Widget = require("../widget")



class RecuperaPassword extends HTMLpage{
    

    constructor(){

        super()  //Invoca il costruttore della superclasse. 

        const form = new Form("/")  //Crea un nuovo form
        form.setProperty("margin-top","14%") //Distanza della finestra di login dall'alto
        form.setProperty("margin-left","60%") //Distanza della finestra di login da sinistra
        form.setProperty("padding-bottom","40px") //Spazio in basso alla finestra
        form.setProperty("background-color","white") //Colore dello sfondo
        form.setProperty("width","340px") //Lunghezza della finestra di login

        const label = new Widget("p","Inserendo i propri dati si riceverà una mail contenente le istruzioni per recuperare la password")  //Crea un tag di tipo p
        label.setProperty("text-align","center"); //Imposta l'allineamento del testo
        label.setProperty("color","rgb(133, 127, 127)");  //Imposta il colore del testo
        label.setProperty("margin-bottom","20px");  //Imposta il margine dal basso
        form.addChild(label)  //Aggiunge il testo al form

        form.addField("Mail","email") //Aggiunge un campo al form per inserire l'e-mail

        const button = form.addButton("Avanti") //Aggiunge il pulsante per recuperare la password
        button.setProperty("margin-top","10%")  //Margine dall'alto
        button.setProperty("background-color","rgba(24,119,242,255)") //Colore di sfondo del pulsante
        
        this.setBackground("LogIn.png") //Imposta lo sfondo della pagina web
        this.addChild(form)
    }
}



module.exports = RecuperaPassword;