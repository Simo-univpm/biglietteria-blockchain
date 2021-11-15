
const Widget = require("../front end/widget")

/*La classe Event crea il widget contenente i vari dati relativi ad un certo evento,
che viene mostrato nella pagina principale del sito. Il costruttore richiede come
parametri un oggetto contenente i dati relativi all'evento e i privilegi dell'utente,
che permettono di personalizzare il widget a seconda del tipo di utente che accede al sito.*/

class Event extends Widget{

    constructor(evento){
        super("div")    //Viene creato un tag di tipo div, associandogli la classe css "Event"
        this.evento = evento
        evento["posti_disponibili"] = evento["postiDisponibili"]+"/"+evento["postiTotali"]
        this.setProperty("border","solid") /*Tipo di bordo dell'evento*/
        this.setProperty("border-color","var(--tema)") /*Colore del bordo dell'evento*/
        this.setProperty("border-width","1px") /*Spessore delbordo dell'evento*/
        this.setProperty("border-radius","3px") /*Raggio del bordo dell'evento (rende il bordo arrotondato)*/
        this.setProperty("background-color","rgba(255, 255, 255, 0.8)") /*Colore di sfondo dell'evento*/
        this.setProperty("box-shadow","0 4px 8px 0 rgba(0, 0, 0, 0.2)") /*Ombra dell'evento*/
        this.setProperty("width","800px") /*Lunghezza dell'evento*/
        this.setProperty("margin-left","22%") /*Distanza dell'evento dal bordo sinistro*/
        this.setProperty("margin-bottom","20px") /*Distanza dell'evento dal bordo in basso*/
        this.setProperty("text-align","center") /*Allineamento del testo*/
        this.setProperty("font-family","arial") /*Font del testo*/
        this.setProperty("display","grid") /*I figli di questa classe sono disposti a griglia*/
        this.setProperty("grid-template-columns","24% 52% 24%") /*Lunghezze delle colonne della griglia*/

        
        //Viene aggiunta l'icona dell'evento (colonna di sinistra)

        const immagine = new Widget("img")   //Viene aggiunta l'immagine dell'evento al widget
        immagine.setAttribute("src",evento.immagine)  //Viene impostato il percorso da cui leggere l'immagine
        immagine.setProperty("padding-left","10px")  /*Spazio a sinistra intorno all'icona*/
        immagine.setProperty("padding-top","10px")  /*Spazio in alto intorno all'icona*/
        immagine.setProperty("padding-bottom","10px")  /*Spazio in basso intorno all'icona*/
        immagine.setProperty("margin","auto")  /*Spazio intorno all'icona*/
        immagine.setProperty("width","100%")  
        this.addChild(immagine)


        //Vengono aggiunti i dettagli dell'evento (colonna centrale)

        this.data = new Widget("div")    //Viene creato un tag di tipo div
        this.data.setProperty("padding","20px") /*Spazio intorno ai dettagli dell'evento*/
        this.data.setProperty("margin-left","5%") /*Distanza dell'oggetto dal bordo sinistro*/ 
        this.data.setProperty("margin-top","2%") /*Distanza dell'oggetto dal bordo in alto*/
        this.data.setProperty("font-family","'Signika', sans-serif") /*Font usato per il testo*/
        this.data.setProperty("color","rgb(172, 157, 157)") /*Colore usato per il testo*/
        this.addChild(this.data)

        const titolo = new Widget("h1",evento.nome)    //Viene creato un tag di tipo h1
        titolo.setProperty("text-align","center") /*Allineamento del testo*/
        titolo.setProperty("color","black") /*Colore del testo*/
        titolo.setProperty("font-size","180%") /*Dimensione del testo*/
        titolo.setProperty("padding-bottom","20px") /*Spazio dal basso*/
        titolo.setProperty("margin","0") /*Margini*/
        titolo.setProperty("width","100%")
        this.data.addChild(titolo)
         
        //Vengono aggiunti il prezzo dell'evento (colonna destra)
        
        this.contenitore = new Widget("div")   //Viene creato un tag di tipo div
        this.contenitore.setProperty("color","var(--tema)") /*Colore del prezzo dell'evento*/
        this.contenitore.setProperty("font-weight","bold") /*Il prezzo viene scritto in grassetto*/
        this.contenitore.setProperty("font-size","22px") /*Dimensione del testo del prezzo*/
        this.contenitore.setProperty("text-align","center") /*Allineamento del testo*/
        this.contenitore.setProperty("margin","auto") /*Margini*/

        this.addChild(this.contenitore)
        
    }

    addButton(text,link){

        const button = new Widget ("button",text)   //Viene creato un tag di tipo button
        button.setAttribute("onclick","window.location.href="+link)   //Viene impostato il link associato al pulsante
        button.setProperty("border","solid") /*Tipo di bordo*/
        button.setProperty("border-radius","8px") /*Raggio del bordo del pulsante (rende il pulsante arrotondato)*/
        button.setProperty("padding","10px") /*Spazio intorno al pulsante*/
        button.setProperty("color","white") /*Colore del testo*/
        button.setProperty("background-color","var(--tema)") /*Colore di sfondo del pulsante*/
        button.setProperty("cursor","pointer") /*Modifica il tipo di puntatore quando si passa sopra al pulsante*/
        button.setProperty("width","160px")
        button.setProperty("font-size","16px") /*Dimensione del testo*/
        button.setProperty("margin-right","10%")

        this.contenitore.addChild(button) //Viene aggiunto il pulsante
    }

    addPrice(){

        const prezzo = new Widget("p",this.evento.prezzo+" €")
        prezzo.setProperty("margin-right","10px") 
        this.contenitore.addChild(prezzo);   //Viene aggiunto il valore del prezzo

    }

    addData(attributi){

        //Aggiunge i vari dati dell'evento ai campi
        for (let i=0; i<attributi.length; i++){  
            const details = new Widget("p",attributi[i].charAt(0).toUpperCase()+attributi[i].slice(1).replace("_"," ")+": "+this.evento[attributi[i]])
            details.setProperty("text-align","left") /*Allineamento del testo*/
            details.setProperty("margin","0") /*Margini*/
            this.data.addChild(details)
        }
    }

    addNumberTicketField(){

        const numero_biglietti = new Widget ("input")   //Viene creato un tag di tipo input

        numero_biglietti.setAttribute("id","ticketNumber")
        numero_biglietti.setAttribute("type","number")
        numero_biglietti.setAttribute("value","1")
        numero_biglietti.setProperty("font-size","80%") /*Dimenzione del testo del campo*/
        numero_biglietti.setProperty("height","32px") /*Altezza del campo*/
        numero_biglietti.setProperty("width","60px") /*Lunghezza del campo*/
        numero_biglietti.setProperty("padding-left","20px") /*Spazio a sinistra del campo*/
        numero_biglietti.setProperty("margin-right","10px")
        numero_biglietti.setProperty("border","1px solid #ccc") /*Tipo di bordo del campo*/
        numero_biglietti.setProperty("border-radius","10px") /*Raggio del bordo del campo (rende il campo arrotondato)*/

        this.contenitore.addChild(numero_biglietti)
    }


}





module.exports = Event;