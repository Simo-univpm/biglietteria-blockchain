const Event = require("../event")
const Widget = require("../widget")


class Biglietto extends Event{

    constructor(biglietto){
        
        super(biglietto)
        
        const QRcode = new Widget("img")   //Crea un tag di tipo img
        QRcode.setAttribute("src",biglietto.qrcode)  //Viene impostata il codice QR da visualizzare (stringa base64)
        QRcode.setProperty("padding-top","0.6vw")  //Spazio in alto intorno al codice QR
        QRcode.setProperty("width","100%")  //Lunghezza dell'immagine
        this.contenitore.addChild(QRcode) //Aggiunge il codice QR al contenitore

        this.addData(["Artisti","Luogo","Data_evento","Orario","Prezzo","Organizzatore","ticketCreationDate","ticketCreationTime"])   //Specifica i campi del biglietto da mostrare

        this.addButton("Download biglietto","'/api/tickets/download?id="+biglietto.ticketID+"'",true)

    }

}



module.exports = Biglietto;