const Widget = require("../widget")


/*La classe Info permette di visualizzare un messaggio di testo all'interno di una pagina web. 

Eredita da Widget. */


class Info extends Widget
{

    constructor(text,padding_top="22vw"){

        super("H5",text)
        
        this.setProperty("margin","auto")   //Distanza da sinistra
        this.setProperty("font-size","140%")    //Dimensione del testo
        this.setProperty("font-family","'Signika', sans-serif") //Tipo di font
        this.setProperty("color","var(--tema)") //Colore del testo mostrato quando la tabella è vuota
        this.setProperty("padding-top",padding_top)  //Spazio dall'alto
        this.setProperty("text-align","center") //Allineamento del testo
    }
    
}

module.exports = Info;