const Event = require("../event")
const Widget = require("../widget")


class Biglietto extends Event{

    constructor(biglietto){
        
        super(biglietto)
        const QRcode = new Widget("img")   //Crea un tag di tipo img
        QRcode.setAttribute("src",biglietto.qrcode)  //Viene impostata il codice QR da visualizzare (stringa base64)
        QRcode.setProperty("padding-top","10px")  //Spazio in alto intorno al codice QR
        QRcode.setProperty("width","100%")  //Lunghezza dell'immagine
        this.contenitore.addChild(QRcode) //Aggiunge il codice QR al contenitore

        this.addData(["Artisti","Luogo","Data_evento","Orario","Prezzo","Organizzatore","ticketCreationDate","ticketCreationTime"])   //Specifica i campi del biglietto da mostrare

        const button = this.addButton("Download biglietto","'/api/tickets/download?id="+biglietto.ticketID+"'",true)
        button.setProperty("width","90%")
        button.setProperty("margin-right","auto")
        button.setProperty("margin-top","00px")
        button.setProperty("margin-bottom","10px")
    }

}



module.exports = Biglietto;