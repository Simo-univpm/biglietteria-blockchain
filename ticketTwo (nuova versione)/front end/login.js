
const Form = require("../front end/form")
const Widget = require("../front end/widget")

/*La classe */

class Login extends Form{
    
    constructor(){

        super("'javascript: login()'")
        this.addField("email","E-mail","email")
        this.addField("password","Password","password")
        this.setProperty("margin-top","10%") /*Distanza della finestra di login dall'alto*/
        this.setProperty("margin-left","60%") /*Distanza della finestra di login da sinistra*/
        this.setProperty("padding-bottom","40px") /*Spazio in basso alla finestra*/
        this.setProperty("width","340px") /*Lunghezza della finestra di login*/
        
        const login_button = this.addButton("Accedi")
        login_button.setProperty("background-color","rgb(24,119,242)") /*Colore di sfondo del pulsante per accedere al sito*/
        login_button.setProperty("margin-top","20px") /*Distanza del pulsante dall'alto*/
        login_button.setProperty("margin-bottom","20px") /*Distanza del pulsante dal basso*/

        const recupera_password = new Widget("label","Password dimenticata?")
        recupera_password.setAttribute("onclick","window.location.href='/recupera-password'") 
        recupera_password.setProperty("color","rgb(24,119,242)") /*Colore del testo*/
        recupera_password.setProperty("font-size","96%") /*Dimensione del testo*/
        recupera_password.setProperty("margin-left","28%") /*Distanza da sinistra*/
        recupera_password.setProperty("cursor","pointer") /*Modifica il tipo di puntatore quando si passa sopra al pulsante*/
        this.addChild(recupera_password);   //Aggiunge il pulsante che permette di recuperare la password dell'account

        const separatore = new Widget("hr")
        separatore.setProperty("width","90%") /*Lunghezza del separatore*/
        separatore.setProperty("margin-left","5%") /*Distanza da sinistra*/
        separatore.setProperty("border-top","1px solid #bbb") /*Tipo di bordo*/
        separatore.setProperty("border-radius","5px") /*Raggio del bordo (rende il separatore arrotondato)*/
        separatore.setProperty("margin-top","20px") /*Distanza dall'alto*/
        separatore.setProperty("margin-bottom","20px") /*Distanza dal basso*/
        this.addChild(separatore);    //Aggiunge un separatore

        this.addInfoMessage("L'email o la password inseriti sono errati").setProperty("margin-left","7%") /*Distanza da sinistra*/

        const signin_button = this.addButton("'Crea nuovo account'","window.location.href='sign-in'")
        signin_button.setProperty("width","60%") /*Lunghezza del pulsante*/
        signin_button.setProperty("margin-left","20%") /*Distanza del pulsante da sinistra*/
    }
}

module.exports = Login;