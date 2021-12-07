const Form = require("../form")
const HTMLpage = require("../HTMLpage")
const Widget = require("../widget")



class RecuperaPassword extends HTMLpage{
    

    constructor(){

        super()  //Invoca il costruttore della superclasse. 
        this.addScript("recuperaPassword")
        this.addScript("form")

        const form = new Form("'javascript: recuperaPassword()'")  //Crea un nuovo form
        form.setProperty("margin-top","13vw") //Distanza della finestra di login dall'alto
        form.setProperty("margin-left","60vw") //Distanza della finestra di login da sinistra
        form.setProperty("padding-bottom","2vw") //Spazio in basso alla finestra
        form.setProperty("background-color","white") //Colore dello sfondo
        form.setProperty("width","26vw") //Lunghezza della finestra di login

        const label = new Widget("p","Inserendo i propri il proprio username le verrà inviata una mail contenente le istruzioni per recuperare la propria password")  //Crea un tag di tipo p
        label.setProperty("text-align","center"); //Imposta l'allineamento del testo
        label.setProperty("color","rgb(133, 127, 127)");  //Imposta il colore del testo
        label.setProperty("margin-bottom","2vw");  //Imposta il margine dal basso
        form.addChild(label)  //Aggiunge il testo al form

        form.addField("Mail","email") //Aggiunge un campo al form per inserire l'e-mail

        form.addInfoMessage("Errore nel recupero della password, controllare l'email inserita")

        const button = form.addButton("Avanti") //Aggiunge il pulsante per recuperare la password
        button.setProperty("margin-top","1vw")  //Margine dall'alto
        button.setProperty("background-color","rgba(24,119,242,255)") //Colore di sfondo del pulsante

        this.setBackground("LogIn.png") //Imposta lo sfondo della pagina web
        this.addChild(form)
    }
}



module.exports = RecuperaPassword;