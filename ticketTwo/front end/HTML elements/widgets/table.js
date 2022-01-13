const Widget = require("../widget")

/*La classe Table implementa una tabella che può essere utilizzata per visualizzare
dati come eventi, biglietti emessi, utenti, ... 

Il costruttore richiede come parametro il titolo della tabella, una lista di tutti i dati da
visualizzare, i nomi dei campi da visualizzare e una callback (opzionale).

Eredita dalla classe Widget.*/



class Table extends Widget{

    //Costruisce la tabella

    constructor(titolo_tabella,database,campi,callback){

        //Viene creato un tag di tipo table

        super("table")  


        // Importa il modulo javascript  necessario al funzionamento del widget

        this.addScript("table")

        this.setProperty("font-family","Arial, Helvetica, sans-serif") //Font usato per il testo della tabella
        this.setProperty("border-collapse","collapse") //Fa collassare i bordi della tabella
        this.setProperty("width","90vw") //Lunghezza della tabella
        this.setProperty("margin-left","5vw") //Distanza da sinistra
        this.setProperty("margin-bottom","2vw") //Distanza dal fondo
        this.setProperty("text-align","left") //Allineamento del testo

        
        //Aggiunge il titolo alla tabella
        
        this.addChild(new Widget("H1",titolo_tabella),titolo => {

            titolo.setProperty("color","var(--tema)") //Colore del titolo della tabella 
            titolo.setProperty("font-size","2vw") //Dimensione del testo
            titolo.setProperty("font-family","'Signika', sans-serif") //Font usato per il testo del titolo della tabella
            titolo.setProperty("margin-left","5vw") //Distanza da sinistra
            titolo.setProperty("padding-top","4vw") //Spazio dall'alto
            titolo.setProperty("padding-bottom","2vw") //Spazio dal basso
            titolo.setProperty("cursor","default"); //Modifica il tipo di puntatore quando si passa sopra all'oggetto
        })   


        //Aggiunge l'intestazione alla tabella (tag di tipo tr)

        this.addChild(new Widget("tr"),intestazione => {

            campi.forEach(campo => {
                
                //Aggiunge i campi all'intestazione (tag di tipo th)
                
                intestazione.addChild(new Widget("th",campo.replace("_"," ")),item => {
    
                    item.setProperty("border","0.1vw solid #ddd") //Tipo di bordo
                    item.setProperty("padding","1vw") //Spazio intorno all'intestazione della tabella
                    item.setProperty("background-color","var(--tema)") //Colore di sfondo dell'intestazione
                    item.setProperty("cursor","default"); //Modifica il tipo di puntatore quando si passa sopra all'oggetto
                    item.setProperty("color","white") //Colore del testo
                })
            })
        })


        //Aggiunge la riga alla tabella (tag di tipo tr)

        database.forEach(record => {

            this.addChild(new Widget("tr"),riga => {

                if (callback!=undefined) riga.setAttribute("onclick",callback)
    
                //Aggiunge il valore dei campi ad ogni riga della tabella
    
                campi.forEach(campo => {
    
                    //Aggiunge il widget alla riga
    
                    riga.addChild(new Widget("th",record[campo.replaceAll(" ","_")]),item => {
    
                        item.setAttribute("onmouseover","enableHover(this)")    //Modifica il colore della riga quando si passa sopra col mouse
                        item.setAttribute("onmouseout","disableHover(this)")    //Ripristina il colore della riga quando si sposta il mouse
    
                        item.setProperty("border","0.1vw solid #ddd")   //Tipo di bordo
                        item.setProperty("padding","0.8vw") //Spazio intorno al campo
                        item.setProperty("background-color","white")    //Colore di sfondo del campo
                        item.setProperty("color","black")   //Colore del testo delle caselle della tabella
                        item.setProperty("cursor","pointer")    //Modifica il tipo di puntatore quando si passa sopra al pulsante
                    })  
                })
            }) 
        })

    }

}



module.exports = Table;