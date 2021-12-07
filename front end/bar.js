const Widget = require("./widget")


/* La classe Bar implementa la navigation bar utilizzata in alcune pagine del sito web

Il costruttore richiede come parametro il widget che andrà a contenere la navigation bar (il body).
Questo parametro è necessario per implementare il menu a tendina (si associa il click sul body
alla chiusura del menu a tendina.

Eredita dalla classe Widget.*/

class Bar extends Widget{

    constructor(parent){

        super("div")  //Viene creato un tag di tipo div
        this.setProperty("background-color","var(--tema)"); //Colore di sfondo della barra
        this.setProperty("height","4vw"); //Altezza della barra
        this.setProperty("width","100vw"); //Lunghezza della barra
        this.setProperty("box-shadow","0px 0px 5px 2px rgba(39, 12, 88, 0.493)"); //Ombra della barra
        this.setProperty("font-family","'Signika', sans-serif"); //Font usato per gli elementi della barra
        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","68vw 6vw 6vw 5vw 5vw 5vw 6vw") //Lunghezze delle colonne della griglia
        this.nomi_categorie=["Cinema","Concerti","Musei","Partite","Teatro"]    //Tipologie di evento mostrate nella barra

        //Logo (scritta ticketTwo sulla barra)

        const logo = new Widget("img");   //Logo della barra (immagine con scritto ticketTwo)
        logo.setAttribute("src","/logo.png");   //Percorso dell'immagine contenente il logo
        logo.setProperty("margin-left","3vw"); //Distanza del logo dal bordo sinistro
        logo.setProperty("margin-top","0.3vw"); //Distanza del logo dal bordo in alto
        logo.setProperty("width","9vw"); //Lunghezza del logo
        this.addChild(logo) //Aggiunge il logo alla barra

        //Aggiunge i pulsanti per selezionare la categoria degli eventi
    
        for (let i=0; i<this.nomi_categorie.length; i++){
            const tipo_evento = new Widget("a",this.nomi_categorie[i])    //Viene creato un tag di tipo a
            tipo_evento.setAttribute("onclick","window.location.href='/?type="+this.nomi_categorie[i]+"'");    //Quando viene premuto il pulsante si viene reindirizzati a una nuova pagina web
            tipo_evento.setProperty("color","white") //Colore del testo del pulsante
            tipo_evento.setProperty("margin-top","1.4vw"); //Distanza del pulsante dal bordo in alto
            tipo_evento.setProperty("font-size","1.1vw"); //Dimensione del testo
            tipo_evento.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
            this.addChild(tipo_evento) //Aggiunge i pulsanti per scegliere il tipo di evento
        }
        
        //Menu a tendina

        this.menu = new Widget("div") //Viene creato un tag di tipo div
        this.menu.setAttribute("id","menu");    //Imposta l'id del tag
        this.menu.setAttribute("is_open","0");  //L'attributo ha valore 0 quando il menu è chiuso
        this.menu.setProperty("background-color","var(--tema)"); //Colore del menu a tendina dell'utente
        this.menu.setProperty("width","14vw"); //Lunghezza del menu a tendina dell'utente
        this.menu.setProperty("margin-top","-0.08vw"); //Distanza del menu a tendina dal bordo in alto
        this.menu.setProperty("margin-left","84vw"); //Distanza del menu a tendina dal bordo sinistro
        this.menu.setProperty("display","none"); //Nasconde il menu a tendina quando è chiuso
        this.menu.setProperty("box-shadow","0vw 0vw 0vw 0.1vw rgba(39, 12, 88, 0.493)"); //Ombra del menu a tendina
        this.menu.setProperty("z-index","1");

        //Pulsante dell'utente (al click apre il menu)
        
        const user_button = new Widget("img")   //Viene creato un tag di tipo img
        user_button.setAttribute("src","/user.png");   //Percorso dell'immagine contenente l'icona dell'utente
        user_button.setAttribute("onclick","openMenu(getElementById('menu'))");    //Alla pressione del pulsante apre il menu
        parent.setAttribute("onclick","closeMenu(getElementById('menu'))");    //Dopo un click sul widget genitore chiude il menu
        user_button.setProperty("margin-top","1vw"); //Distanza del pulsante dal bordo in alto
        user_button.setProperty("margin-left","0.4vw"); //Distanza del pulsante dal bordo sinistro
        user_button.setProperty("width","2vw"); //Lunghezza del pulsante
        user_button.setProperty("cursor","pointer"); //Modifica il tipo di puntatore quando si passa sopra al pulsante
        this.addChild(user_button); //Aggiunge il pulsante dell'utente alla barra

        this.addChild(this.menu)    //Aggiunge il menu alla barra (non viene visualizzato!!!)
        
    }

    /*La funzione permette di aggiungere una voce al menu a tendina associato alla barra. La funzione
    richiede come parametri il testo del pulsante e la funzione da invocare alla sua pressione. */

    addItem(text,onclick){

        const item = new Widget("p",text)  //Viene creato un tag di tipo p
        item.setAttribute("onclick",onclick);    //Alla pressione della voce si viene reindirizzati in una nuova pagina web
        item.setProperty("padding","0.5vw"); //Padding di un opzione del menu a tendina
        item.setProperty("background-color","var(--tema)"); //Colore di sfondo di un opzione del menu a tendina
        item.setProperty("font-size","1vw"); //Dimensione del testo di un opzione del menu a tendina
        item.setProperty("text-align","center"); //Allineamento del testo di un opzione del menu a tendina
        item.setProperty("cursor","pointer"); //Modifica il tipo di puntatore quando si passa sopra all'opzione del menu a tendina
        item.setProperty("color","white"); //Colore del testo di un opzione del menu a tendina
        this.menu.addChild(item)    //Aggiunge la voce al menu
    }

}



module.exports = Bar;