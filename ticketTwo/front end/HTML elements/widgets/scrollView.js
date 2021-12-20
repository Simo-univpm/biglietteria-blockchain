const Card = require("../widgets/card")
const Info = require("../widgets/info")
const Widget = require("../widget")


/*La classe ScrollView implementa un contenitore di oggetti di tipo Card che si può scorrere
dall'alto verso il basso con il mouse.

Eredita da Widget. */



class ScrollView extends Widget{

    constructor(data,callback,empty_message="Nessun evento disponibile",add_cover=true){

        super("div")    //Viene creato un tag di tipo div

        //Crea la copertina della pagina (immagine posta sotto la navigation bar)
        //La copertina viene aggiunta solo se add_cover è vero
        
        if (add_cover){

            this.addChild(new Widget("img"),copertina => {

                copertina.setAttribute("src","/images/copertina.png")   //Imposta la sorgente dell'immagine
                copertina.setProperty("width","100vw")   //Lunghezza dell'immagine
                copertina.setProperty("padding-bottom","0.3vw");  //Padding in basso
                copertina.setProperty("margin-bottom","2vw");  //Margine dal basso
                copertina.setProperty("background-color","var(--tema)");    //Imposta il colore dello sfondo
                copertina.setProperty("box-shadow","0 2vw 2vw 0 rgba(0, 0, 0, 0.2)") //Ombra della copertina
            })
        }

        if (data.length>0) data.forEach(evento => this.addChild(new Card(evento),callback)) //Aggiunge le cards alla lista

        else this.addChild(new Info(empty_message,"14vw")) //Se la lista di dati e vuota inserisce un messaggio nella scrollview
    }
}



module.exports = ScrollView;