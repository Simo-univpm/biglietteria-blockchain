const Form = require("../form")
const HTMLpage = require("../HTMLpage")
const Widget = require("../widget")

/*La classe Login implementa il Form in cui il client va ad immettere le credenziali per il login.

Eredita dalla classe Form. */


class Login extends HTMLpage{
    

    constructor(redirect_url){

        super()  //Invoca il costruttore della superclasse.
        this.addScript("login")
        this.addScript("form")
        
        const form = new Form("'javascript: login("+'"'+redirect_url+'"'+")'") //Viene creato un form a cui si associa l'azione login() (vedi modulo client.js)
        form.setProperty("margin-top","10vw") //Distanza della finestra di login dall'alto
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

        const recupera_password = new Widget("label","Password dimenticata?")   //Aggiunge il pulsante per recuperare la password, nel caso l'utente l'abbia dimenticata
        recupera_password.setAttribute("onclick","window.location.href='/recupera-password'") //Premendo il pulsante si viene reindirizzati alla pagina per recuperare la password
        recupera_password.setProperty("color","rgb(24,119,242)") //Colore del testo
        recupera_password.setProperty("font-size","1.06vw") //Dimensione del testo
        recupera_password.setProperty("margin-left","7.8vw") //Distanza da sinistra
        recupera_password.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
        form.addChild(recupera_password);   //Aggiunge il pulsante che permette di recuperare la password dell'account

        const separatore = new Widget("hr") //Viene creato un tag di tipo hr (separatore)
        separatore.setProperty("width","25vw") //Lunghezza del separatore
        separatore.setProperty("margin-left","0.5vw") //Distanza da sinistra
        separatore.setProperty("border-top","0.1vw solid #bbb") //Tipo di bordo
        separatore.setProperty("border-radius","2vw") //Raggio del bordo (rende il separatore arrotondato)
        separatore.setProperty("margin-top","1vw") //Distanza dall'alto
        separatore.setProperty("margin-bottom","1vw") //Distanza dal basso
        form.addChild(separatore);  //Aggiunge il separatore

        const info = form.addInfoMessage("L'email o la password inseriti sono errati") //Aggiunge un oggetto che mostra un messaggio in caso di errore
        info.setProperty("color","rgb(66,183,42)")
        info.setProperty("font-size","0.9vw")
        
        const signin_button = form.addButton("'Crea nuovo account'","window.location.href='sign-in'")   //Aggiunge il pulsante per creare un nuovo account
        signin_button.setProperty("width","13vw") //Lunghezza del pulsante
        signin_button.setProperty("margin-left","6.5vw") //Distanza del pulsante da sinistra
        signin_button.setProperty("background-color","rgb(66,183,42)")
        
        this.setBackground("LogIn.png") //Imposta lo sfondo della pagina
        this.addChild(form)
    }
}



module.exports = Login;