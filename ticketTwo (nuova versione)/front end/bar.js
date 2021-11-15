
const Widget = require("../front end/widget")

/* La classe Bar implementa la navigation bar utilizzata in alcune pagine del sito web
I parametri del costruttore sono il widget che andrà a contenere la navigation bar (il body),
l'username dell'utente (viene mostrato nel menu a tendina) e i privilegi associati all'utente
(a seconda dei privilegi viene mostrato un menu a tendina diverso)*/

class Bar extends Widget{

    constructor(parent){
        super("div")  //Viene creato un tag di tipo div, associandogli la classe css "Bar"
        this.setProperty("background-color","var(--tema)"); /*Colore di sfondo della barra*/
        this.setProperty("height","60px"); /*Altezza della barra*/
        this.setProperty("width","100%"); /*Lunghezza della barra*/
        this.setProperty("box-shadow","0px 0px 5px 2px rgba(39, 12, 88, 0.493)"); /*Ombra della barra*/
        this.setProperty("font-family","'Signika', sans-serif"); /*Font usato per gli elementi della barra*/
        this.setProperty("display","grid") /*I figli di questa classe sono disposti a griglia*/
        this.setProperty("grid-template-columns","67% 6% 6% 5% 5% 5% 6%") /*Lunghezze delle colonne della griglia*/
        this.setProperty("position","fixed");
        this.nomi_categorie=["Cinema","Concerti","Musei","Partite","Teatro"]    //Tipologie di evento mostrate nella barra

        const logo = new Widget("img");   //Logo della barra (immagine con scritto ticketTwo)
        logo.setAttribute("src","../logo.png");   //Percorso dell'immagine contenente il logo
        logo.setProperty("margin-left","60px"); /*Distanza del logo dal bordo sinistro*/
        logo.setProperty("margin-top","3px"); /*Distanza del logo dal bordo in alto*/
        logo.setProperty("width","130px"); /*Lunghezza del logo*/
        this.addChild(logo)
    
        for (let i=0; i<this.nomi_categorie.length; i++){
            const tipo_evento = new Widget("a",this.nomi_categorie[i])    //Viene creato un tag di tipo a, associandogli la classe css "EventType"
            tipo_evento.setAttribute("onclick","window.location.href='?type="+this.nomi_categorie[i]+"'");    //Quando viene premuto il pulsante si viene reindirizzati a una nuova pagina web
            tipo_evento.setProperty("color","white") 
            tipo_evento.setProperty("margin-top","20px"); /*Distanza del pulsante dal bordo in alto*/
            tipo_evento.setProperty("cursor","pointer") /*Modifica il tipo di puntatore quando si passa sopra al pulsante*/
            this.addChild(tipo_evento) //Aggiunge i pulsanti per scegliere il tipo di evento
        }
        
        this.menu = new Widget("div") //Viene creato un tag di tipo div
        this.menu.setAttribute("id","menu");
        this.menu.setAttribute("is_open","0");
        this.menu.setProperty("background-color","var(--tema)"); /*Colore del menu a tendina dell'utente*/
        this.menu.setProperty("width","180px"); /*Lunghezza del menu a tendina dell'utent*/
        this.menu.setProperty("margin-top","2px"); /*Distanza del menu a tendina dal bordo in alto*/
        this.menu.setProperty("margin-left","1240px"); /*Distanza del menu a tendina dal bordo sinistro*/
        this.menu.setProperty("display","none"); /*Nasconde il menu a tendina quando è chiuso*/
        this.menu.setProperty("box-shadow","0px 0px 1px 1px rgba(39, 12, 88, 0.493)"); /*Ombra del menu a tendina*/
        
        const user_button = new Widget("img")   //Viene creato un tag di tipo img, associandogli la classe css "UserButton"
        user_button.setAttribute("src","../user.png");   //Percorso dell'immagine contenente l'icona dell'utente
        user_button.setAttribute("onclick","openMenu(getElementById('menu'))");    //Alla pressione del pulsante apre il menu
        parent.setAttribute("onclick","closeMenu(getElementById('menu'))");    //Dopo un click sul widget genitore chiude il menu
        user_button.setProperty("margin-top","12px"); /*Distanza del pulsante dal bordo in alto*/
        user_button.setProperty("margin-left","20px"); /*Distanza del pulsante dal bordo sinistro*/
        user_button.setProperty("width","32px"); /*Lunghezza del pulsante*/
        user_button.setProperty("cursor","pointer"); /*Modifica il tipo di puntatore quando si passa sopra al pulsante*/
        
        this.addChild(user_button); //Aggiunge il pulsante dell'utente
        this.addChild(this.menu)
        
    }

    addItem(text,onclick){
        const item = new Widget("p",text)  //Viene creato un tag di tipo p
        item.setAttribute("onclick",onclick);    //Alla pressione della voce si viene reindirizzati in una nuova pagina web
        item.setProperty("padding","8px"); /*Padding di un opzione del menu a tendina*/
        item.setProperty("background-color","var(--tema)"); /*Colore di sfondo di un opzione del menu a tendina*/
        item.setProperty("font-size","14px"); /*Dimensione del testo di un opzione del menu a tendina*/
        item.setProperty("text-align","center"); /*Allineamento del testo di un opzione del menu a tendina*/
        item.setProperty("cursor","pointer"); /*Modifica il tipo di puntatore quando si passa sopra all'opzione del menu a tendina*/
        item.setProperty("color","white"); /*Colore del testo di un opzione del menu a tendina*/
        this.menu.addChild(item)
    }
}

module.exports = Bar;
