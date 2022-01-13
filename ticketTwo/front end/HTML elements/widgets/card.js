const Widget = require("../widget")


/*La classe Card permette di implementare una card, cioè un riquadro contenente immagini,
testo, bottoni, ...

Eredita dalla classe Widget.*/


class Card extends Widget{

    constructor(data){

        //Viene creato un tag di tipo div
        
        super("div")    
        this.data = data

        //Proprietà CSS del contenitore
        
        this.setProperty("border","solid")  //Tipo di bordo della card
        this.setProperty("border-color","var(--tema)") //Colore del bordo della card
        this.setProperty("border-width","0.12vw") //Spessore delbordo della card
        this.setProperty("border-radius","1vw") //Raggio del bordo della card (rende il bordo arrotondato)
        this.setProperty("background-color","rgba(255, 255, 255, 0.8)") //Colore di sfondo della card
        this.setProperty("box-shadow","0 2vw 2vw 0 rgba(0, 0, 0, 0.2)") //Ombra della card
        this.setProperty("width","56vw") //Lunghezza della card
        this.setProperty("margin-left","22vw") //Distanza della card dal bordo sinistro
        this.setProperty("margin-bottom","2vw") //Distanza della card dal bordo in basso
        this.setProperty("text-align","center") //Allineamento del testo
        this.setProperty("font-family","arial") //Font del testo
        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","24% 50% 26%") //Lunghezze delle colonne della griglia

        
        //Viene aggiunta l'icona della card (colonna di sinistra)

        this.addChild(new Widget("img"),immagine => {

            immagine.setAttribute("src",this.data.Icona_evento)  //Viene impostata l'immagine da visualizzare (stringa base64)
            immagine.setProperty("padding-top","0.8vw")  //Spazio in alto intorno all'icona
            immagine.setProperty("padding-bottom","0.8vw")  //Spazio in basso intorno all'icona
            immagine.setProperty("padding-left","0.4vw")  //Spazio a sinistra intorno all'icona
            immagine.setProperty("margin","auto")  //Spazio intorno all'icona
            immagine.setProperty("width","100%")  //Lunghezza dell'immagine
        }) 


        //Vengono aggiunti i dettagli della card (colonna centrale)
        
        this.addChild(new Widget("div"),data => {

            this.card_data = data
            this.card_data.setProperty("padding","2vw") //Spazio intorno ai dettagli della card
            this.card_data.setProperty("margin-top","1vw") //Distanza dell'oggetto dal bordo in alto
            this.card_data.setProperty("font-family","'Signika', sans-serif") //Font usato per il testo
            this.card_data.setProperty("color","rgb(172, 157, 157)") //Colore usato per il testo
            this.card_data.setProperty("font-size","1.2vw") //Dimensione del testo
        })    

        //Aggiunge il titolo al widget contenente i dettagli della card

        this.card_data.addChild(new Widget("h1",this.data.Nome),titolo => {

            titolo.setProperty("text-align","center") //Allineamento del testo
            titolo.setProperty("color","black") //Colore del testo
            titolo.setProperty("font-size","2vw") //Dimensione del testo
            titolo.setProperty("padding-bottom","2vw") //Spazio dal basso
            titolo.setProperty("margin","0") //Margini
        })  
        

        //Viene aggiunto un contenitore al widget contenente i dettagli della card (colonna destra)
        
        this.addChild(new Widget("div"),contenitore => {

            this.contenitore = contenitore
            this.contenitore.setProperty("color","var(--tema)") //Colore del prezzo della card
            this.contenitore.setProperty("font-weight","bold") //Il prezzo viene scritto in grassetto
            this.contenitore.setProperty("font-size","1.6vw") //Dimensione del testo del prezzo
            this.contenitore.setProperty("text-align","center") //Allineamento del testo
            this.contenitore.setProperty("margin","auto") //Margini
            this.contenitore.setProperty("padding-bottom","1vw")
        }) 
        
    }



    /*La funzione permette di aggiungere un pulsante al contenitore della card. La funzione
    richiede come parametri il testo del pulsante e il link da aprire premendo il pulsante. */


    addButton(text,link,new_tab=false){

        const button = new Widget ("button",text)   //Viene creato un tag di tipo button

        //Viene impostato il link associato al pulsante (se new_tab è vero viene aperta una nuova scheda)

        button.setAttribute("onclick",new_tab ? "window.open('"+link+"?id="+this.data.ticketID+"')" : "window.location.href='"+link+"?id="+this.data.eventID+"'")
            
        button.setProperty("border","solid") //Tipo di bordo
        button.setProperty("border-radius","1vw") //Raggio del bordo del pulsante (rende il pulsante arrotondato)
        button.setProperty("padding","0.9vw") //Spazio intorno al pulsante
        button.setProperty("color","white") //Colore del testo
        button.setProperty("background-color","var(--tema)") //Colore di sfondo del pulsante
        button.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
        button.setProperty("width","13vw") //Lunghezza del pulsante
        button.setProperty("font-size","1.1vw") //Dimensione del testo
        button.setProperty("margin-right","auto")    //Distanza dal margine destro

        this.contenitore.addChild(button) //Viene aggiunto il pulsante
        return button
    }


    
    /*La funzione permette di aggiungere il prezzo della card all'interno del contenitore della card.*/


    addPrice(){

        const prezzo = new Widget("p",this.data.Prezzo+" €")  //Crea un tag di tipo p
        prezzo.setProperty("margin-right","1vw") //Distanza dal margine destro
        this.contenitore.addChild(prezzo);   //Viene aggiunto il valore del prezzo
    }

    

    /*La funzione permette di specificare i campi da aggiungere al contenitore della card. La funzione
    richiede come parametro una lista di tutti i campi da visualizzare. */


    addData(campi){

        //Aggiunge i vari dati della card ai campi

        campi.forEach(campo => {

            if (this.data[campo] != "Nessuno" && this.data[campo] != undefined) this.card_data.addChild(new Widget("p",campo.replace("_"," ")+": "+this.data[campo]),details => {

                details.setProperty("text-align","left") //Allineamento del testo
                details.setProperty("margin","0") //Margini
            })  
        })
    }


    
    /*La funzione permette di aggiungere un campo per selezionare il numero di biglietti da acquistare
    al contenitore della card. */


    addNumberTicketField(){

        this.contenitore.addChild(new Widget ("input"),numero_biglietti => {

            numero_biglietti.setAttribute("id","numero_biglietti")  //ID del campo
            numero_biglietti.setAttribute("type","number")  //Tipo di campo
            numero_biglietti.setAttribute("value","1")  //Valore di default
            numero_biglietti.setAttribute("name","field");  //Imposta il nome del campo

            numero_biglietti.setProperty("font-size","1.3vw") //Dimenzione del testo del campo
            numero_biglietti.setProperty("height","3.2vw") //Altezza del campo
            numero_biglietti.setProperty("width","4vw") //Lunghezza del campo
            numero_biglietti.setProperty("padding-left","1.2vw") //Spazio a sinistra del campo
            numero_biglietti.setProperty("margin-right","1vw") //Distanza dal margine destro
            numero_biglietti.setProperty("border","0.12vw solid #ccc") //Tipo di bordo del campo
            numero_biglietti.setProperty("border-radius","1vw") //Raggio del bordo del campo (rende il campo arrotondato)
        })
    }



    /*La funzione permette di aggiungere un QRcode al contenitore della card.*/


    addTicketQRcode(){

        //Aggiunge il codice QR al contenitore (tag di tipo img)
        
        this.contenitore.addChild(new Widget("img"),QRcode => {

            QRcode.setAttribute("src",this.data.qrcode)  //Viene impostata il codice QR da visualizzare (stringa base64)
            QRcode.setProperty("padding-top","0.6vw")  //Spazio in alto intorno al codice QR
            QRcode.setProperty("width","100%")  //Lunghezza dell'immagine
        })
    }



    /*La funzione restituisce il campo stato dell'oggetto*/


    getStato(){
        return this.data.stato
    }

}



module.exports = Card;