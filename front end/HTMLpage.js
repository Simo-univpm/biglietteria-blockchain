const Widget = require("../front end/widget")
const Bar = require("../front end/bar")


/*La classe HTMLpage crea una generica pagina HTML cui si può aggiungere qualunque tipo
di tag tramite la funzione addChild(). Per creare un nuovo tag è necessario istanziare un
nuovo oggetto della classe Widget (vedi implementazione della classe widget). 

Il costruttore richiede un solo parametro opzionale, un oggetto contenente i dati relativi all'utente. 
Questo parametro permette di personalizzare la pagina web in base al tipo di utente che accede al
sito web (event manager, cliente, staff biglietteria, ...).

La funzione send invia la pagina web appena creata al client. Richiede come parametro la risposta
HTTP da restituire al client.*/


class HTMLpage
{
    //Viene creata una pagina HTML generica

    constructor(user=null){
        this.document = new Widget("HTML")  //Crea un tag di tipo HTML
        const titolo = "ticketTwo"  //Titolo del sito web
        const descrizione = "Prenota i biglietti per i tuoi eventi preferiti. Su ticketTwo trovi concerti, sport, cinema e molto altro."    //Descrizione del sito web
        this.head = new Head(titolo,descrizione)    //Crea un oggetto di tipo Head (intestazione della pagina web)
        this.document.addChild(this.head)   //Aggiunge l'intestazione alla pagina web

        const librerie = ["client.js"]
        
        //!!!NOTA!!! Il file "client.js" contiene le funzioni javascript che vengono eseguite lato client

        for(let i=0; i<librerie.length; i+=1){
            const script = new Widget("script") //Crea un tag di tipo script
            script.setAttribute("src",librerie[i])  //Importa il modulo all'interno del tag di tipo script
            this.head.addChild(script)  //Aggiunge il tag all'intestazione della pagina web
        }   
        
        this.body = new Body()  //Crea un oggetto di tipo body (corpo della pagina web)
        this.document.addChild(this.body)   //Aggiunge il corpo alla pagina web

        //Se non viene passato nessun parametro al costruttore, viene aggiunta la navigation bar alla pagina web

        /*!!!NOTA!!! Il parametro al costruttore va passato solamente quando la pagina web
        corrisponde ad un'area riservata. Le pagine web che non richiedono il login non hanno
        la navigation bar. Il menu della navigation bar è customizzato in base ai privilegi
        dell'utente.*/

        if (user!=null){

            this.bar = new Bar(this.body); //Viene creato un oggetto di tipo Bar (navigation bar della pagina web)

            this.bar.addItem(user.email,"window.location.href='/profilo'");   //Aggiunge al menu a tendina della barra il pulsante per accedere all'area riservata

            if (user.privileges == "Cliente")   this.bar.addItem("I miei biglietti","/");    //Se l'utente è un cliente, aggiunge al menu a tendina della barra il pulsante per vedere i biglietti acquistati

            else if (user.privileges == "Organizzatore eventi")  this.bar.addItem("Crea nuovo evento","window.location.href='/new-event'");   //Se l'utente è un event manager, aggiunge al menu a tendina della barra il pulsante per creare un nuovo evento

            else if (user.privileges == "Staff biglietteria"){

                this.bar.addItem("Concedi privilegi","window.location.href='/grant-privileges'");   //Se l'utente è un membro dello staff della biglietteria, aggiunge al menu a tendina della barra il pulsante per concedere privilegi agli utenti
                this.bar.addItem("Visualizza utenti","window.location.href='/users'");   //Se l'utente è un membro dello staff della biglietteria, aggiunge al menu a tendina della barra il pulsante per accedere lista degli utenti iscritti
            }  
            else if (user.privileges == "Annullatore")  this.bar.addItem("Biglietti invalidati","/");    //Se l'utente è un annulaltore, aggiunge al menu a tendina della barra il pulsante per visulizzare la lista dei biglietti invalidati

            this.bar.addItem("Log out","logout()");  //Aggiunge al menu a tendina della barra il pulsante per effettuare il logout dall'area riservata
            this.addChild(this.bar); //Aggiunge la navigation bar al corpo (body) della pagina web
        }

    }

    /*La funzione permette di aggiungere elementi all'interno della pagina web. Chiede come parametro l'elemento da aggiungere
    alla pagina web (deve essere un oggetto della classe widget).*/

    addChild(child){
        this.body.addChild(child)  //Aggiunge il widget (tag) passato per parametro al corpo (body) della pagina web
    }
    
    //La funzione permette di impostare lo sfondo della pagina web

    setBackground(background){
        this.body.setProperty("background-image",'url('+background+')');  //Imposta lo sfondo della pagina HTML
    }

    //La funzione aggiunge la pagina web alla risposta HTTP che verrà inviata al client

    send(res){

        /*this.document.get() costruisce l'albero DOM associato al documento HTML
        una volta creato l'albero si invia la pagina HTML al client*/
        
        res.end(this.document.get())  //Invia la pagina HTML al client
    }
    
}



/*La classe Head implementa l'intestazione di una generica pagina web. Permette di definire
il titolo e la descrizione associati al sito web (vanno passati come parametri al costruttore).
Eredita dalla classe Widget. */


class Head extends Widget
{
    //Viene generata l'intestazione della pagina HTML

    constructor(titolo,descrizione){
        super("head")   //Chiama il costruttore della superclasse, viene creato un tag di tipo head
        this.addChild(new Widget("title",titolo))   //Aggiunge il titolo all'intestazione (tag di tipo title)

        const meta = new Widget("meta") //Crea un tag di tipo meta
        meta.setAttribute("name","description") 
        meta.setAttribute("content",descrizione)    //Imposta la descrizione della pagina web
        this.addChild(meta) //Aggiunge il tag all'intestazione

        const charset = new Widget("meta")  //Crea un tag di tipo meta
        charset.setAttribute("charset","UTF8")  //Imposta a UTF-8 la codifica del testo della pagina web
        this.addChild(charset)  //Aggiunge il tag all'intestazione
        
        const stili = new Widget("link")    //Crea un tag di tipo link
        stili.setAttribute("rel","stylesheet")
        stili.setAttribute("href","stili.css")  //Imposta il percorso del file css in cui sono contenuti gli stili della pagina web
        this.addChild(stili)    //Aggiunge il tag all'intestazione
    }
}



/*La classe Body implementa il corpo di una generica pagina web.
Eredita dalla classe widget. */


class Body extends Widget
{
    //Viene generato il corpo della pagina HTML

    constructor(){
        super("body")
        this.setProperty("margin","0");   //Imposta i margini
        this.setProperty("background-size","1440px 818px");   //Dimensione del body
        this.setProperty("background-repeat","no-repeat");   //Adatta lo sfondo del body alla pagina web
    }
}



module.exports = HTMLpage;