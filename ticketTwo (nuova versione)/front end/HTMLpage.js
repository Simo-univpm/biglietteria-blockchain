const Widget = require("../front end/widget")
const Bar = require("../front end/bar")

class HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(user=null){
        this.document = new Widget("HTML")
        const titolo = "ticketTwo"
        const descrizione = "Prenota i biglietti per i tuoi eventi preferiti. Su ticketTwo trovi concerti, sport, cinema e molto altro."
        this.head = new Head(titolo,descrizione)
        this.document.addChild(this.head)
        const script = new Widget("script")
        script.setAttribute("src","widget.js")  
        this.head.addChild(script)
        this.body = new Body()
        this.document.addChild(this.body)

        if (user!=null){
            const bar = new Bar(this.body);
            
            bar.addItem(user.email,"window.location.href='/area-riservata'");

            if (user.privileges == 0)   bar.addItem("I miei biglietti","/");

            else if (user.privileges == 1)  bar.addItem("Crea nuovo evento","window.location.href='/new-event'");

            else if (user.privileges == 2)  bar.addItem("Visualizza utenti","window.location.href='/users'");

            else if (user.privileges == 3)  bar.addItem("Biglietti invalidati","/");

            bar.addItem("Log out","logout()");
            this.addChild(bar);
        }

    }

    addChild(child){
        this.body.addChild(child)  //Aggiunge il widget (tag) passato per parametro come figlio
    }

    setBackground(background){
        this.body.setProperty("background-image",'url('+background+')');  //Imposta lo sfondo della pagina HTML
    }

    send(res){
        res.end(this.document.get())  //Invia la pagina HTML al client
    }
}

class Head extends Widget
{
    //Viene generata l'intestazione della pagina HTML

    constructor(titolo,descrizione){
        super("head")
        this.addChild(new Widget("title",titolo))
        const meta = new Widget("meta")
        meta.setAttribute("name","description")
        meta.setAttribute("content",descrizione)
        const charset = new Widget("meta")
        charset.setAttribute("charset","UTF8")
        this.addChild(charset)
        const stili = new Widget("link")
        stili.setAttribute("rel","stylesheet")
        stili.setAttribute("href","stili.css")
        this.addChild(stili)
    }
}

class Body extends Widget
{
    //Viene generato il corpo della pagina HTML

    constructor(){
        super("body")
        this.setProperty("margin","0");   /*Imposta i margini*/
        this.setProperty("background-size","1440px 818px");   /*Dimensione del body*/
        this.setProperty("background-repeat","no-repeat");   /*Adatta lo sfondo del body alla pagina web*/
    }
}


module.exports = HTMLpage;