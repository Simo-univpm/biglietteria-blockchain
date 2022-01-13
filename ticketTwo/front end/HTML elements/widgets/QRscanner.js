const Widget = require("../widget")

/*La classe QRScanner implementa uno scanner di codici QR che può essere inserito all'interno di una pagina web.
Al click sul widget viene avviata la fotocamera del dispositivo. Ogni 2 secondi verrà fatto un tentativo di
decodifica del QR inquadrato dalla fotocamera.

Eredita da Widget. */



class QRScanner extends Widget
{

    constructor(){

        // Invoca il costruttore della superclasse per generare un tag di tipo video

        super("video")


        // Importa i moduli javascript  necessari al funzionamento del widget

        this.addScript("QRscanner")
        this.addScript("jsqr/dist/jsQR")


        // Imposta gli attributi del tag

        this.setAttribute("autoplay","true")
        this.setAttribute("onclick","scan(this)")


        // Imposta le proprietà CSS da associare al tag
        
        this.setProperty("background-color","black")    //Colore di sfondo
        this.setProperty("width","26vw")    //Lunghezza video
        this.setProperty("height","20vw")   //Altezza video
        this.setProperty("margin-left","3vw")   //Distanza da sinistra
    }
}

module.exports = QRScanner;