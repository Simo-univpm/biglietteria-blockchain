const Widget = require("./widget")


/*La classe HTMLpage crea una generica pagina HTML cui si può aggiungere qualunque tipo
di tag tramite la funzione addChild(). Per creare un nuovo tag è necessario istanziare un
nuovo oggetto della classe Widget (vedi implementazione della classe widget). 

La funzione send invia la pagina web appena creata al client. Richiede come parametro la risposta
HTTP da restituire al client.*/


class HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(){

        //Crea un tag di tipo HTML

        this.document = new Widget("HTML")  


        //Aggiunge l'intestazione al documento HTML

        this.document.addChild(new Widget("head"),head => {

            //Aggiunge il titolo all'intestazione (tag di tipo title)

            head.addChild(new Widget("title","ticketTwo"))

            //Imposta la descrizione della pagina web

            head.addChild(new Widget("meta"),meta => {

                meta.setAttribute("name","description") 
                meta.setAttribute("content","Prenota i biglietti per i tuoi eventi preferiti.")    
            })

            //Imposta a UTF-8 la codifica del testo della pagina web

            head.addChild(new Widget("meta"),meta => meta.setAttribute("charset","UTF8"))

            //Imposta il percorso del file css in cui sono contenuti gli stili della pagina web

            head.addChild(new Widget("link"),link => {

                link.setAttribute("rel","stylesheet")
                link.setAttribute("href","/stili/stili.css") 
            })

            this.head = head
        })


        //Aggiunge il corpo al documento HTML
        
        this.document.addChild(new Widget("body"),body => {
            
            body.setProperty("margin","0");   //Imposta i margini
            body.setProperty("background-size","100vw 58vw");   //Dimensione del body
            body.setProperty("background-repeat","no-repeat");   //Adatta lo sfondo del body alla pagina web
            this.body = body

        })   

    }



    /*La funzione permette di aggiungere elementi all'interno della pagina web. Chiede come parametro l'elemento da aggiungere
    alla pagina web (deve essere un oggetto della classe widget).*/

    addChild(child,callback){

        if (callback) callback(child)
        this.body.addChild(child)  //Aggiunge il widget (tag) passato per parametro al corpo (body) della pagina web
    }

    

    //La funzione aggiunge la pagina web alla risposta HTTP che verrà inviata al client

    send(res,status=200){

        //Aggiunge gli script javascript necessari per il funzionamento della pagina web
        
        this.document.getScripts().forEach((modulo) => this.head.addChild(new Widget("script"),script => script.setAttribute("src","/scripts"+modulo)))

        /*this.document.get() costruisce l'albero DOM associato al documento HTML
        una volta creato l'albero si invia la pagina HTML al client*/

        res.status(status).end(this.document.get())  //Invia la pagina HTML al client
    }
    
}

module.exports = HTMLpage;