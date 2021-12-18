const Form = require("../../HTML elements").Widgets.Form
const Logo = require("../../HTML elements").Widgets.Logo
const HTMLpage = require("../../HTML elements").HTMLpage



class RecuperaPassword extends HTMLpage{
    

    constructor(){

        super()  //Invoca il costruttore della superclasse.

        this.addChild(new Logo())
        this.body.setProperty("background-color","rgb(240,242,245)") 

        //Aggiunge un form alla pagina web

        this.addChild(new Form("/api/users/recupera-password","POST","/eventi?type=Cinema"),form => {

            form.setProperty("margin-top","-16vw") //Distanza della finestra di login dall'alto
            form.setProperty("margin-left","60vw") //Distanza della finestra di login da sinistra
            form.setProperty("padding-bottom","2vw") //Spazio in basso alla finestra
            form.setProperty("background-color","white") //Colore dello sfondo
            form.setProperty("width","26vw") //Lunghezza della finestra di login

            form.addText("Inserendo i propri il proprio username le verrà inviata una mail contenente le istruzioni per recuperare la propria password")  //Aggiunge il testo al form
            form.addField("Mail","email") //Aggiunge un campo al form per inserire l'e-mail
            form.addInfoMessage()
            form.addButton("Avanti") //Aggiunge il pulsante per recuperare la password
        
        })
        
    }
}



module.exports = RecuperaPassword;