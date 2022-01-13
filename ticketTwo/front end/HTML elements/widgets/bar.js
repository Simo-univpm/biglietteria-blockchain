const Widget = require("../widget")


/* La classe Bar implementa la navigation bar utilizzata in alcune pagine del sito web

Il costruttore richiede come parametro il widget che andrà a contenere la navigation bar (il body).
Questo parametro è necessario per implementare il menu a tendina (si associa il click sul body
alla chiusura del menu a tendina.

Eredita dalla classe Widget.*/

class Bar extends Widget{

    constructor(parent){

        //Viene creato un tag di tipo div

        super("div")  


        // Importa i moduli javascript  necessari al funzionamento del widget

        this.addScript("bar")
        this.addScript("logout")


        // Imposta le proprietà CSS del widget

        this.setProperty("background-color","var(--tema)"); //Colore di sfondo della barra
        this.setProperty("height","4vw"); //Altezza della barra
        this.setProperty("width","100vw"); //Lunghezza della barra
        this.setProperty("box-shadow","0px 0px 5px 2px rgba(39, 12, 88, 0.493)"); //Ombra della barra
        this.setProperty("font-family","'Signika', sans-serif"); //Font usato per gli elementi della barra
        this.setProperty("display","grid") //I figli di questa classe sono disposti a griglia
        this.setProperty("grid-template-columns","68vw 6vw 6vw 5vw 5vw 5vw 6vw") //Lunghezze delle colonne della griglia

        //Aggiunge il logo alla barra (scritta ticketTwo sulla barra) 
        
        this.addChild(new Widget("img"),logo => {
            
            logo.setAttribute("src","/images/bar_logo.png");   //Percorso dell'immagine contenente il logo
            logo.setProperty("margin-left","3vw"); //Distanza del logo dal bordo sinistro
            logo.setProperty("margin-top","0.3vw"); //Distanza del logo dal bordo in alto
            logo.setProperty("width","9vw"); //Lunghezza del logo
        })

        //Aggiunge i pulsanti per selezionare la categoria degli eventi
    
        new Array("Cinema","Concerti","Musei","Partite","Teatro").forEach(tipo => {

            this.addChild(new Widget("a",tipo),(button) => {

                button.setAttribute("onclick","window.location.href='/?type="+tipo+"'");    //Quando viene premuto il pulsante si viene reindirizzati a una nuova pagina web
                button.setProperty("color","white") //Colore del testo del pulsante
                button.setProperty("margin-top","1.4vw"); //Distanza del pulsante dal bordo in alto
                button.setProperty("font-size","1.1vw"); //Dimensione del testo
                button.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
            })
        })
        
        //Menu a tendina

        this.menu = new Widget("div") //Viene creato un tag di tipo div
        this.menu.setAttribute("id","menu");    //Imposta l'id del tag
        this.menu.setAttribute("is_open","0");  //L'attributo ha valore 0 quando il menu è chiuso
        this.menu.setProperty("background-color","var(--tema)"); //Colore del menu a tendina dell'utente
        this.menu.setProperty("width","18vw"); //Lunghezza del menu a tendina dell'utente
        this.menu.setProperty("margin-top","-0.08vw"); //Distanza del menu a tendina dal bordo in alto
        this.menu.setProperty("margin-left","80vw"); //Distanza del menu a tendina dal bordo sinistro
        this.menu.setProperty("display","none"); //Nasconde il menu a tendina quando è chiuso
        this.menu.setProperty("box-shadow","0vw 0vw 0vw 0.1vw rgba(39, 12, 88, 0.493)"); //Ombra del menu a tendina
        this.menu.setProperty("z-index","1");

        //Aggiunge il pulsante dell'utente (al click apre il menu)
        
        this.addChild(new Widget("img"),button => {

            button.setAttribute("src","/images/user.png");   //Percorso dell'immagine contenente l'icona dell'utente
            button.setAttribute("onclick","openMenu(getElementById('menu'))");    //Alla pressione del pulsante apre il menu
            parent.setAttribute("onclick","closeMenu(getElementById('menu'))");    //Dopo un click sul widget genitore chiude il menu
            button.setProperty("margin-top","1vw"); //Distanza del pulsante dal bordo in alto
            button.setProperty("margin-left","0.4vw"); //Distanza del pulsante dal bordo sinistro
            button.setProperty("width","2vw"); //Lunghezza del pulsante
            button.setProperty("cursor","pointer"); //Modifica il tipo di puntatore quando si passa sopra al pulsante
        }); 

        this.addChild(this.menu)    //Aggiunge il menu alla barra (non viene visualizzato!!!)
        
    }

    /*La funzione permette di aggiungere una voce al menu a tendina associato alla barra. La funzione
    richiede come parametri il testo del pulsante e la funzione da invocare alla sua pressione. */

    addItem(text,onclick){

        //Aggiunge la voce al menu
        
        this.menu.addChild(new Widget("p",text),button => {

            button.setAttribute("onclick",onclick);    //Alla pressione della voce si viene reindirizzati in una nuova pagina web
            button.setProperty("padding","0.5vw"); //Padding di un opzione del menu a tendina
            button.setProperty("background-color","var(--tema)"); //Colore di sfondo di un opzione del menu a tendina
            button.setProperty("font-size","1vw"); //Dimensione del testo di un opzione del menu a tendina
            button.setProperty("text-align","center"); //Allineamento del testo di un opzione del menu a tendina
            button.setProperty("cursor","pointer"); //Modifica il tipo di puntatore quando si passa sopra all'opzione del menu a tendina
            button.setProperty("color","white"); //Colore del testo di un opzione del menu a tendina
        })    
    }

}



module.exports = Bar;