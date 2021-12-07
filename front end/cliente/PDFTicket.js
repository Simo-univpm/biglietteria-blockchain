const Widget = require("../widget")


class PDFTicket extends Widget{

    constructor(biglietto){
        
        super("div")    //Viene creato un tag di tipo div

        //Proprietà CSS del contenitore
        
        this.setProperty("border","solid") //Tipo di bordo dell'evento
        this.setProperty("border-color","var(--tema)") //Colore del bordo dell'evento
        this.setProperty("border-width","1px") //Spessore delbordo dell'evento
        this.setProperty("border-radius","3px") //Raggio del bordo dell'evento (rende il bordo arrotondato)
        this.setProperty("background-color","rgba(255, 255, 255, 0.8)") //Colore di sfondo dell'evento
        this.setProperty("box-shadow","0 4px 8px 0 rgba(0, 0, 0, 0.2)") //Ombra dell'evento
        this.setProperty("width","80%") //Lunghezza del biglietto
        this.setProperty("height","80%") //Altezza del biglietto
        this.setProperty("margin-left","10%") //Distanza del biglietto dai bordi
        this.setProperty("margin-top","10%") //Distanza del biglietto dai bordi
        this.setProperty("text-align","center") //Allineamento del testo
        this.setProperty("font-family","arial") //Font del testo


        //Viene aggiunta l'icona dell'evento (colonna di sinistra)

        const qrcode = new Widget("img")   //Crea un tag di tipo img
        qrcode.setAttribute("src",biglietto.qrcode)  //Viene impostato il qrcode da visualizzare (stringa base64)
        qrcode.setProperty("padding-left","10px")  //Spazio a sinistra intorno al qrcode
        qrcode.setProperty("padding-top","10px")  //Spazio in alto intorno al qrcode
        qrcode.setProperty("padding-bottom","10px")  //Spazio in basso intorno al qrcode
        qrcode.setProperty("width","60%")  //Lunghezza del qrcode
        this.addChild(qrcode) //Aggiunge il qrcode al contenitore


        //Vengono aggiunti i dettagli dell'evento (colonna centrale)

        const data = new Widget("div")    //Viene creato un tag di tipo div
        data.setProperty("padding","20px") //Spazio intorno ai dettagli dell'evento
        data.setProperty("margin-left","5%") //Distanza dell'oggetto dal bordo sinistro 
        data.setProperty("margin-top","2%") //Distanza dell'oggetto dal bordo in alto
        data.setProperty("font-family","'Signika', sans-serif") //Font usato per il testo
        data.setProperty("color","rgb(172, 157, 157)") //Colore usato per il testo
        this.addChild(data)    //Aggiunge i dettagli dell'evento al contenitore

        const campi = ["Nome evento","Artisti","Luogo","Data_evento","Orario","Prezzo","Organizzatore","Nome","Cognome","Data_di_nascita","Genere","ticketCreationDate","ticketCreationTime"]

        for (let i=0; i<campi.length; i++){

            const details = new Widget("p",campi[i].replaceAll("_"," ")+": "+biglietto[campi[i]])  //Crea un tag di tipo p
            details.setProperty("text-align","left") //Allineamento del testo
            details.setProperty("margin","0") //Margini
            data.addChild(details) //Aggiunge i dati al contenitore dell'evento
        }
    
    }

}



module.exports = PDFTicket;