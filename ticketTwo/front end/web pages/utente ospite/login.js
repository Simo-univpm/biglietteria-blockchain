const Form = require("../../HTML elements").Widgets.Form
const HTMLpage = require("../../HTML elements").HTMLpage
const Logo = require("../../HTML elements").Widgets.Logo

/*La classe Login implementa il Form in cui il client va ad immettere le credenziali per il login.

Eredita dalla classe Form. */


class Login extends HTMLpage{

    constructor(redirect_url){

        super()  //Invoca il costruttore della superclasse.

        this.addChild(new Logo())

        const form = new Form("/api/users/login","POST",redirect_url) //Viene creato un form a cui si associa l'azione login() (vedi modulo client.js)
        form.setProperty("margin-top","-18vw") //Distanza della finestra di login dall'alto
        form.setProperty("margin-left","60vw") //Distanza della finestra di login da sinistra
        form.setProperty("padding-bottom","3vw") //Spazio in basso alla finestra
        form.setProperty("width","26vw") //Lunghezza della finestra di login
        form.setProperty("background-color","rgb(255, 255, 255)") //Colore di sfondo della finestra di login

        form.addField("Mail","email") //Aggiunge il campo per inserire il nome utente
        form.addField("Password","password") //Aggiunge il campo per inserire la password
        
        const login_button = form.addButton("Accedi")   //Aggiunge il pulsante per accedere all'area riservata
        login_button.setProperty("background-color","rgb(24,119,242)") //Colore di sfondo del pulsante per accedere al sito
        login_button.setProperty("margin-top","2vw") //Distanza del pulsante dall'alto
        login_button.setProperty("margin-bottom","2vw") //Distanza del pulsante dal basso

        const recupera_password = form.addText("Password dimenticata?")   //Aggiunge il pulsante per recuperare la password, nel caso l'utente l'abbia dimenticata
        recupera_password.setAttribute("onclick","window.location.href='/users/recupera-password'") //Premendo il pulsante si viene reindirizzati alla pagina per recuperare la password
        recupera_password.setProperty("color","rgb(24,119,242)") //Colore del testo
        recupera_password.setProperty("font-size","1.06vw") //Dimensione del testo
        recupera_password.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante

        form.addSeparator();  //Aggiunge il separatore

        form.addInfoMessage("rgb(66,183,42)","0.9vw") //Aggiunge un oggetto che mostra un messaggio in caso di errore
        
        const signin_button = form.addButton("Crea nuovo account","window.location.href='/users/sign-in'")   //Aggiunge il pulsante per creare un nuovo account
        signin_button.setProperty("width","13vw") //Lunghezza del pulsante
        signin_button.setProperty("margin-left","6.5vw") //Distanza del pulsante da sinistra
        signin_button.setProperty("background-color","rgb(66,183,42)")
        
        this.body.setProperty("background-color","rgb(240,242,245)")
        this.addChild(form)
    }
}



module.exports = Login;