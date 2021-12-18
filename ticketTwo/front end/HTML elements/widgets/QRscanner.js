const Widget = require("../widget")

/*La classe QRScanner implementa uno scanner di codici QR che può essere inserito all'interno di una pagina web.
Al click sul widget viene avviata la fotocamera del dispositivo. Ogni 2 secondi verrà fatto un tentativo di
decodifica del QR inquadrato dalla fotocamera.

Eredita da Widget. */



class QRScanner extends Widget
{

    constructor(){

        super("video")
        this.addScript("QRscanner")
        this.addScript("jsqr/dist/jsQR")

        this.setAttribute("autoplay","true")
        this.setAttribute("onclick","scan(this)")
        
        this.setProperty("background-color","black")
        this.setProperty("width","26vw")
        this.setProperty("height","20vw")
        this.setProperty("margin-left","3vw")
    }
}

module.exports = QRScanner;