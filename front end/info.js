const Widget = require("./widget")


class Info extends Widget
{

    constructor(text){

        super("H5",text) //Crea una nuova pagina HTML (area riservata)
        
        this.setProperty("margin-left","35%") /*Distanza da sinistra*/
        this.setProperty("font-size","140%") /*Dimensione del testo*/
        this.setProperty("font-family","'Signika', sans-serif") /*Tipo di font*/
        this.setProperty("color","var(--tema)") /*Colore del testo mostrato quando la tabella è vuota*/
        this.setProperty("width","30%") /*Lunghezza del testo*/
        this.setProperty("padding-top","260px") /*Spazio dall'alto*/
        this.setProperty("text-align","center") /*Allineamento del testo*/
        
    }
    
}

module.exports = Info;