
/*La classe Table implementa una tabella che può essere utilizzata per visualizzare
dati come eventi, biglietti emessi, utenti, ... Il costruttore richiede come parametro
un oggetto contenente tutti i valori da aggiungere nella tabella, il titolo della tabella
e il testo da mostrare quando la tabella è vuota.*/

const Widget = require("./widget")

class Table extends Widget{

    constructor(titolo_tabella){


        super("table")  //Viene creato un tag di tipo table, associandogli la classe css "Table"
        this.setProperty("font-family","Arial, Helvetica, sans-serif") /*Font usato per il testo della tabella*/
        this.setProperty("border-collapse","collapse") /**/
        this.setProperty("width","90%") /*Lunghezza della tabella*/
        this.setProperty("margin-left","5%") /*Distanza da sinistra*/
        this.setProperty("margin-bottom","50px") /*Distanza dal fondo*/
        this.setProperty("text-align","left") /*Allineamento del testo*/

        const titolo = new Widget("H1",titolo_tabella)   //Viene creato un tag di tipo H1
        titolo.setProperty("color","var(--tema)") /*Colore del titolo della tabella*/ 
        titolo.setProperty("font-size","32px") /*Dimensione del testo*/
        titolo.setProperty("font-family","'Signika', sans-serif") /*Font usato per il testo del titolo della tabella*/
        titolo.setProperty("margin-left","5%") /*Distanza da sinistra*/
        titolo.setProperty("padding-top","60px") /*Spazio dall'alto*/
        titolo.setProperty("padding-bottom","30px") /*Spazio dal basso*/
        titolo.setProperty("cursor","default"); /*Modifica il tipo di puntatore quando si passa sopra all'oggetto*/
        this.addChild(titolo)
    }

    addHeader(campi){
        const intestazione = new Widget("tr") //Viene creato un tag di tipo tr (intestazione tabella)
        this.addChild(intestazione)
        
        for (let i=0; i<campi.length; i++){
            const header_item = new Widget("th",campi[i].charAt(0).toUpperCase()+campi[i].slice(1).replace("_"," "))
            header_item.setProperty("border","1px solid #ddd") /*Tipo di bordo*/
            header_item.setProperty("padding","8px") /*Spazio intorno all'intestazione della tabella*/
            header_item.setProperty("background-color","var(--tema)") /*Colore di sfondo dell'intestazione*/
            header_item.setProperty("cursor","default"); /*Modifica il tipo di puntatore quando si passa sopra all'oggetto*/
            header_item.setProperty("color","white") /*Colore del testo*/
            intestazione.addChild(header_item)  //Aggiunge i campi all'intestazione
        }
    }

    addRecord(valori,campi){
        const riga = new Widget("tr");   //Viene creato un tag di tipo tr (riga tabella)
        this.addChild(riga)

        for (let i=0; i<campi.length; i++){
            const line_item = new Widget("th",valori[campi[i]])   //Aggiunge il valore dei campi ad ogni riga della tabella
            line_item.setProperty("border","1px solid #ddd") /*Tipo di bordo*/
            line_item.setProperty("padding","8px") /*Spazio intorno al campo*/
            line_item.setProperty("background-color","white") /*Colore di sfondo del campo*/
            line_item.setProperty("cursor","default") /*Modifica il tipo di puntatore quando si passa sopra al pulsante*/
            line_item.setProperty("color","black") /*Colore del testo delle caselle della tabella*/
            riga.addChild(line_item)  //Aggiunge il widget alla riga
        }
    }
}

module.exports = Table;