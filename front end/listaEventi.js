const Event = require("./event")
const Info = require("./info")
const Widget = require("./widget")


class ListaEventi extends Widget{

    constructor(eventi,callback){

        super("div")    //Viene creato un tag di tipo div

        //Crea la copertina della pagina (immagine posta sotto la navigation bar)

        const copertina = new Widget("img") //Crea un tag di tipo img
        copertina.setAttribute("src","/copertina.png")   //Imposta la sorgente dell'immagine
        copertina.setProperty("width","100vw")   //Lunghezza dell'immagine
        copertina.setProperty("padding-bottom","0.3vw");  //Padding in basso
        copertina.setProperty("margin-bottom","2vw");  //Margine dal basso
        copertina.setProperty("background-color","var(--tema)");    //Imposta il colore dello sfondo
        copertina.setProperty("box-shadow","0 2vw 2vw 0 rgba(0, 0, 0, 0.2)") //Ombra della copertina
        this.addChild(copertina)    //Aggiunge la copertina al contenitore

        if (eventi.length>0){

            //Aggiunge gli eventi alla lista

            for (let i=0; i<eventi.length; i+=1){

                const evento = new Event(eventi[i]) //Crea un nuovo evento
                callback(evento)
                this.addChild(evento)
            }
        }

        else{
            const info = new Info("Nessun evento disponibile")
            info.setProperty("padding-top","160px")
            this.addChild(info)
        } 

    }

}



module.exports = ListaEventi;