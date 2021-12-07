const Widget = require("./widget")

/*La classe Table implementa una tabella che può essere utilizzata per visualizzare
dati come eventi, biglietti emessi, utenti, ... 

Il costruttore richiede come parametro il titolo della tabella. 

Eredita dalla classe Widget.*/


class Table extends Widget{

    //Costruisce la tabella

    constructor(titolo_tabella){

        super("table")  //Viene creato un tag di tipo table
        this.setProperty("font-family","Arial, Helvetica, sans-serif") //Font usato per il testo della tabella
        this.setProperty("border-collapse","collapse") //Fa collassare i bordi della tabella
        this.setProperty("width","90vw") //Lunghezza della tabella
        this.setProperty("margin-left","5vw") //Distanza da sinistra
        this.setProperty("margin-bottom","2vw") //Distanza dal fondo
        this.setProperty("text-align","left") //Allineamento del testo

        const titolo = new Widget("H1",titolo_tabella)   //Viene creato un tag di tipo H1
        titolo.setProperty("color","var(--tema)") //Colore del titolo della tabella 
        titolo.setProperty("font-size","2vw") //Dimensione del testo
        titolo.setProperty("font-family","'Signika', sans-serif") //Font usato per il testo del titolo della tabella
        titolo.setProperty("margin-left","5vw") //Distanza da sinistra
        titolo.setProperty("padding-top","4vw") //Spazio dall'alto
        titolo.setProperty("padding-bottom","2vw") //Spazio dal basso
        titolo.setProperty("cursor","default"); //Modifica il tipo di puntatore quando si passa sopra all'oggetto
        this.addChild(titolo)   //Aggiunge il titolo alla tabella
    }

    //Aggiunge l'intestazione alla tabella. Chiede come parametro una lista dei campi della tabella.

    addHeader(campi){

        const intestazione = new Widget("tr") //Viene creato un tag di tipo tr 
        this.addChild(intestazione) //Aggiunge l'intestazione alla tabella
        
        for (let i=0; i<campi.length; i++){
            const header_item = new Widget("th",campi[i].charAt(0).toUpperCase()+campi[i].slice(1).replace("_"," "))    //Crea un tag di tipo th
            header_item.setProperty("border","0.1vw solid #ddd") //Tipo di bordo
            header_item.setProperty("padding","1vw") //Spazio intorno all'intestazione della tabella
            header_item.setProperty("background-color","var(--tema)") //Colore di sfondo dell'intestazione
            header_item.setProperty("cursor","default"); //Modifica il tipo di puntatore quando si passa sopra all'oggetto
            header_item.setProperty("color","white") //Colore del testo
            intestazione.addChild(header_item)  //Aggiunge i campi all'intestazione
        }
    }

    addRecord(valori,campi,callback){

        const riga = new Widget("tr");   //Viene creato un tag di tipo tr
        this.addChild(riga)     //Aggiunge la riga alla tabella

        if (callback!=undefined)
            riga.setAttribute("onclick",callback)

        for (let i=0; i<campi.length; i++){
            const line_item = new Widget("th",valori[campi[i].replaceAll(" ","_")])   //Aggiunge il valore dei campi ad ogni riga della tabella
            line_item.setProperty("border","0.1vw solid #ddd") //Tipo di bordo
            line_item.setProperty("padding","0.8vw") //Spazio intorno al campo
            line_item.setProperty("background-color","white") //Colore di sfondo del campo
            line_item.setProperty("color","black") //Colore del testo delle caselle della tabella
            line_item.setAttribute("onmouseover","enableHover(this)")
            line_item.setAttribute("onmouseout","disableHover(this)")
            line_item.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
            riga.addChild(line_item)  //Aggiunge il widget alla riga
        }

    }
}



module.exports = Table;