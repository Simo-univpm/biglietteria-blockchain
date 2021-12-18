const Widget = require("../../HTML elements/widget")
const HTMLpage = require("../../HTML elements").HTMLpage
const Info = require("../../HTML elements").Widgets.Info
const pdf = require('html-pdf');


class Ticket extends HTMLpage{

    constructor(biglietto){
        
        typeof biglietto != 'string' ? super().addChild(new Widget("div"),card => {

            //Proprietà CSS del contenitore
        
            card.setProperty("border","solid") //Tipo di bordo dell'evento
            card.setProperty("border-color","var(--tema)") //Colore del bordo dell'evento
            card.setProperty("border-width","1px") //Spessore delbordo dell'evento
            card.setProperty("border-radius","3px") //Raggio del bordo dell'evento (rende il bordo arrotondato)
            card.setProperty("background-color","rgba(255, 255, 255, 0.8)") //Colore di sfondo dell'evento
            card.setProperty("box-shadow","0 4px 8px 0 rgba(0, 0, 0, 0.2)") //Ombra dell'evento
            card.setProperty("width","80%") //Lunghezza del biglietto
            card.setProperty("height","80%") //Altezza del biglietto
            card.setProperty("margin-left","10%") //Distanza del biglietto dai bordi
            card.setProperty("margin-top","10%") //Distanza del biglietto dai bordi
            card.setProperty("text-align","center") //Allineamento del testo
            card.setProperty("font-family","arial") //Font del testo


            //Aggiunge il qrcode al pdf
            
            card.addChild(new Widget("img"),qrcode => {

                qrcode.setAttribute("src",biglietto.qrcode)  //Viene impostato il qrcode da visualizzare (stringa base64)
                qrcode.setProperty("padding-left","10px")  //Spazio a sinistra intorno al qrcode
                qrcode.setProperty("padding-top","10px")  //Spazio in alto intorno al qrcode
                qrcode.setProperty("padding-bottom","10px")  //Spazio in basso intorno al qrcode
                qrcode.setProperty("width","60%")  //Lunghezza del qrcode
            }) 


            //Aggiunge i dettagli dell'evento al pdf
            
            const data =new Widget("div")
            data.setProperty("padding","20px") //Spazio intorno ai dettagli dell'evento
            data.setProperty("margin-left","5%") //Distanza dell'oggetto dal bordo sinistro 
            data.setProperty("margin-top","2%") //Distanza dell'oggetto dal bordo in alto
            data.setProperty("font-family","'Signika', sans-serif") //Font usato per il testo
            data.setProperty("color","rgb(172, 157, 157)") //Colore usato per il testo
            card.addChild(data)

            new Array("Nome evento","Artisti","Luogo","Data_evento","Orario","Prezzo","Organizzatore","Nome","Cognome","Data_di_nascita","Genere","Data_emissione","Orario_emissione").forEach(campo => 

                data.addChild(new Widget("p",campo.replaceAll("_"," ")+": "+biglietto[campo]),data => {
                    data.setProperty("text-align","left") //Aggiunge i dati al contenitore dell'evento
                    data.setProperty("margin","0") //Margini
                })
            )
        }) : super().addChild(new Info("Il biglietto richiesto non è disponibile"))

    }

    send(res,status){

        status == 200 ? new Promise((resolve,reject) => pdf.create(this.document.get(),{ format: "A4"}).toBuffer((err,buffer) => err ? reject(err) : resolve(buffer)))
        .then(pdf => res.set('Content-disposition', 'filename=My Ticket').set('Content-Type', 'application/pdf').status(status).end(pdf)) : super.send(res,status)
    }

}



module.exports = Ticket;