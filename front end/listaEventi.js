const Widget = require("./widget")


class ListaEventi extends Widget{

    constructor(){

        super("div")    //Viene creato un tag di tipo div

        //Crea la copertina della pagina (immagine posta sotto la navigation bar)

        const copertina = new Widget("img") //Crea un tag di tipo img
        copertina.setAttribute("src","copertina.png")   //Imposta la sorgente dell'immagine
        copertina.setProperty("width","100%")   //Lunghezza dell'immagine
        copertina.setProperty("padding-bottom","5px");  //Padding in basso
        copertina.setProperty("margin-bottom","20px");  //Margine dal basso
        copertina.setProperty("background-color","var(--tema)");    //Imposta il colore dello sfondo
        this.addChild(copertina)    //Aggiunge la copertina al contenitore
        
    }

}



module.exports = ListaEventi;