const HTMLpage = require("../../HTML elements").HTMLpage

// Widgets

const Form = require("../../HTML elements").Widgets.Form
const Logo = require("../../HTML elements").Widgets.Logo


/*

La classe implementa la pagina web contenente il form di login per autenticarsi
al sito web.

Il costruttore richiede come parametro l'url della pagina cui reindirizzare il client
una volta autenticato (link della pagina a cui l'utente vuole accedere).

*/


class Login extends HTMLpage{

    constructor(redirect_url){

        // Invoca il costruttore della superclasse per generare una pagina web
        // Viene aggiunto alla pagina il logo del sito

        super().addChild(new Logo())


        // Imposta il colore di sfondo della pagina web

        this.body.setProperty("background-color","rgb(240,242,245)")


        // Aggiunge un form per inserire le credenziali dell'utente che vuole autenticarsi

        this.addChild(new Form("/api/users/login","POST",redirect_url),form => {

            // Imposta le proprietà CSS del form

            form.setProperty("margin-top","-18vw") //Distanza della finestra di login dall'alto
            form.setProperty("margin-left","60vw") //Distanza della finestra di login da sinistra
            form.setProperty("padding-bottom","3vw") //Spazio in basso alla finestra
            form.setProperty("width","26vw") //Lunghezza della finestra di login
            form.setProperty("background-color","rgb(255, 255, 255)") //Colore di sfondo della finestra di login


            // Aggiunge il campo per inserire il nome utente

            form.addField("Mail","email") 


            // Aggiunge il campo per inserire la password

            form.addField("Password","password") 


            // Aggiunge il pulsante per accedere all'area riservata
            
            const login_button = form.addButton("Accedi")
            login_button.setProperty("margin-top","2vw") //Distanza del pulsante dall'alto
            login_button.setProperty("margin-bottom","2vw") //Distanza del pulsante dal basso


            // Aggiunge il pulsante per recuperare la password, nel caso l'utente l'abbia dimenticata

            const recupera_password = form.addText("Password dimenticata?")   
            recupera_password.setAttribute("onclick","window.location.href='/users/recupera-password'") //Premendo il pulsante si viene reindirizzati alla pagina per recuperare la password
            recupera_password.setProperty("color","rgb(138,146,177)") //Colore del testo
            recupera_password.setProperty("font-size","1.06vw") //Dimensione del testo
            recupera_password.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante

            
            // Aggiunge un separatore

            form.addSeparator()


            // Aggiunge un oggetto che mostra un messaggio in caso di errore

            form.addInfoMessage("rgb(66,183,42)","0.9vw") 


            // Aggiunge il pulsante per iscriversi al sito
            
            const signin_button = form.addButton("Crea un nuovo account","window.location.href='/users/sign-in'")   
            signin_button.setProperty("width","60%") //Lunghezza del pulsante
            signin_button.setProperty("margin-left","20%")
            signin_button.setProperty("background-color","rgb(66,183,42)")  //Colore del pulsante
            
        })
        
    }
}



module.exports = Login;