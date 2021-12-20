const Widget = require("../widget")

/*La classe Logo permette di visualizzare il logo del sito all'interno di una pagina web. 

Eredita da Widget. */



class Logo extends Widget
{

    constructor(){

        super("img")    //Genera un tag di tipo immagine

        this.setAttribute("src","/images/logo.png") //Imposta la sorgente dell'immagine
        this.setProperty("width","38vw")    //Lunghezza dell'immagine
        this.setProperty("margin-top","10vw")   //Margini dall'alto
        this.setProperty("margin-left","10vw")  //Margini da sinistra
    }
    
}

module.exports = Logo;