const Form = require("../front end/form")
const Widget = require("../front end/widget")

/*La classe Login implementa il Form in cui il client va ad immettere le credenziali per il login.

Eredita dalla classe Form. */


class Login extends Form{
    
    //Crea un nuovo form per il login

    constructor(){

        super("'javascript: login()'")  //Invoca il costruttore della superclasse. Viene creato un form a cui si associa l'azione login() (vedi modulo client.js)
        this.addField("Mail","email") //Aggiunge il campo per inserire il nome utente
        this.addField("Password","password") //Aggiunge il campo per inserire la password
        this.setProperty("margin-top","10%") //Distanza della finestra di login dall'alto
        this.setProperty("margin-left","60%") //Distanza della finestra di login da sinistra
        this.setProperty("padding-bottom","40px") //Spazio in basso alla finestra
        this.setProperty("width","340px") //Lunghezza della finestra di login
        this.setProperty("background-color","rgb(255, 255, 255)") //Colore di sfondo della finestra di login
        
        const login_button = this.addButton("Accedi")   //Aggiunge il pulsante per accedere all'area riservata
        login_button.setProperty("background-color","rgb(24,119,242)") //Colore di sfondo del pulsante per accedere al sito
        login_button.setProperty("margin-top","20px") //Distanza del pulsante dall'alto
        login_button.setProperty("margin-bottom","20px") //Distanza del pulsante dal basso

        const recupera_password = new Widget("label","Password dimenticata?")   //Aggiunge il pulsante per recuperare la password, nel caso l'utente l'abbia dimenticata
        recupera_password.setAttribute("onclick","window.location.href='/recupera-password'") //Premendo il pulsante si viene reindirizzati alla pagina per recuperare la password
        recupera_password.setProperty("color","rgb(24,119,242)") //Colore del testo
        recupera_password.setProperty("font-size","96%") //Dimensione del testo
        recupera_password.setProperty("margin-left","28%") //Distanza da sinistra
        recupera_password.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
        this.addChild(recupera_password);   //Aggiunge il pulsante che permette di recuperare la password dell'account

        const separatore = new Widget("hr") //Viene creato un tag di tipo hr (separatore)
        separatore.setProperty("width","90%") //Lunghezza del separatore
        separatore.setProperty("margin-left","5%") //Distanza da sinistra
        separatore.setProperty("border-top","1px solid #bbb") //Tipo di bordo
        separatore.setProperty("border-radius","5px") //Raggio del bordo (rende il separatore arrotondato)
        separatore.setProperty("margin-top","20px") //Distanza dall'alto
        separatore.setProperty("margin-bottom","20px") //Distanza dal basso
        this.addChild(separatore);  //Aggiunge il separatore

        this.addInfoMessage("L'email o la password inseriti sono errati").setProperty("margin-left","7%") //Aggiunge un oggetto che mostra un messaggio in caso di errore

        const signin_button = this.addButton("'Crea nuovo account'","window.location.href='sign-in'")   //Aggiunge il pulsante per creare un nuovo account
        signin_button.setProperty("width","60%") //Lunghezza del pulsante
        signin_button.setProperty("margin-left","20%") //Distanza del pulsante da sinistra
    }
}



module.exports = Login;