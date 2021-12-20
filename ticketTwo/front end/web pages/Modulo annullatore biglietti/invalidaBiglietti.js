const HTMLpage = require("../../HTML elements").HTMLpage
const Form = require("../../HTML elements").Widgets.Form
const QRScanner = require("../../HTML elements").Widgets.QRScanner
const Logo = require("../../HTML elements").Widgets.Logo


/*La classe invalida biglietti costruisce la pagina web in cui
l'annullatore può invalidare i biglietti. All'interno della pagina
è presente uno scanner di codici QR.

Eredita da HTMLpage. */


class InvalidaBiglietti extends HTMLpage
{

    constructor(){
        
        // Invoca il costruttore della superclasse per generare una pagina web

        super()


        // Aggiunge il logo del sito

        this.addChild(new Logo())   


        // Modifica il colore del body

        this.body.setProperty("background-color","rgb(240,242,245)")    

        // Aggiunge un form
        
        this.addChild(new Form(),form => {

            // Importa il modulo javascript necessario per eseguire illogout

            form.addScript("logout")    


            // Imposta le proprietà CSS del form
            
            form.setProperty("margin-top","-20vw")  //Margini dall'alto
            form.setProperty("margin-left","60vw")  //Margini da sinistra
            form.setProperty("background-color","white")    //Colore dello sfondo
            form.setProperty("width","32vw")    //Lunghezza


            //Aggiunge lo scanner dei QR code

            form.addChild(new QRScanner(),scanner => scanner.setProperty("margin-bottom","1.6vw"))  


            //Aggiunge il campo per inserire la password del wallet

            form.addField("Password wallet","password") 


            //Messaggio che viene visualizzato in risposta all'invio dati del form

            form.addInfoMessage()  


            //Pulsante per accedere al profilo dell'utente

            form.addButton("Il mio profilo","window.location.href='/users/profilo'").setProperty("grid-column","span 2")  
            
            
            //Pulsante per il logout
            
            form.addButton("Logout","logout()").setProperty("grid-column","span 2") 
        })
    }

}


module.exports = InvalidaBiglietti;