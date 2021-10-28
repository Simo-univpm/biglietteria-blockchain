
/* La classe Bar implementa la navigation bar utilizzata in alcune pagine del sito web
I parametri del costruttore sono il widget che andrà a contenere la navigation bar (il body),
l'username dell'utente (viene mostrato nel menu a tendina) e i privilegi associati all'utente
(a seconda dei privilegi viene mostrato un menu a tendina diverso)*/

class Bar extends Widget{

    constructor(contenitore,username,privilegi){
        super("div","Bar")  //Viene creato un tag di tipo div, associandogli la classe css "Bar"
        this.nomi_categorie=["Cinema","Concerti","Musei","Partite","Teatro"]    //Tipologie di evento mostrate nella barra   
        new Logo("immagini/logo.png").add(this.elemento);   //Logo della barra (immagine con scritto ticketTwo)
        
        this.menu = new Widget("nav","Menu").add(this.elemento);    //Viene creato un tag di tipo nav, associandogli la classe css "Menu" (è il menu sul lato destro)
        this.categorie = new Widget("ul").add(this.menu);   //Viene creato un tag di tipo ul, che andrà a contenere i pulsanti per scegliere il tipo di evento
        
        for (let i=0; i<this.nomi_categorie.length; i++)
            new EventType(this.nomi_categorie[i]).add(this.categorie);  //Aggiunge i pulsanti per scegliere il tipo di evento
        
        this.sottomenu = new UserMenu(username,privilegi)   //Crea il menu a tendina che compare quando si clicca sull'icona dell'utente
        this.sottomenu.add(this.elemento)   //Aggiunge il menu a tendina alla barra
        const user = new UserButton("immagini/user.png",this.sottomenu,function (){this.sottomenu.open()}).add(this.categorie); //Crea e aggiunge il pulsante dell'utente
        contenitore.sottomenu = this.sottomenu
        contenitore.onclick = function () {this.sottomenu.close()}  //Quando si fa click sul body il menu a tendina (se aperto) si chiuderà 
    }
}

/* La classe Logo implementa il logo del sito da inserire nella navigation bar*/

class Logo extends Widget{

    constructor(immagine){
        super("img","Logo") //Viene creato un tag di tipo img, associandogli la classe css "Logo"
        this.elemento.src = immagine;   //Percorso dell'immagine contenente il logo
    }
}

/* La classe UserButton implementa il pulsante dell'utente, da inserire nella navigation bar*/

class UserButton extends Widget{
    constructor(immagine,sottomenu,onclick=null){
        super("img","UserButton")   //Viene creato un tag di tipo img, associandogli la classe css "UserButton"
        this.elemento.src = immagine;   //Percorso dell'immagine contenente l'icona dell'utente
        this.elemento.sottomenu = sottomenu;    //Riferimento al menu a tendina che si apre quando si preme il pulsante
        this.elemento.onclick = onclick;    //Funzione associata alla pressione del pulsante
    }
}

/* La classe EventType implementa i pulsanti per scegliere il tipo di evento 
("Cinema","Concerti","Musei","Partite","Teatro"),da inserire nella navigation bar*/

class EventType extends Widget{
    constructor(text){
        super("a","EventType",text) //Viene creato un tag di tipo a, associandogli la classe css "EventType"
        this.elemento.onclick = function (){cambiaPagina("eventi?categoria="+text)};    //Quando viene premuto il pulsante si viene reindirizzati a una nuova pagina web
    }
}

/* La classe UserMenu implementa il menu a tendina dell'utente, che viene mostrato quando si preme il pulsante con l'icona dell'utente.
I parametri da passare al costruttore sono lo username e i privilegi dell'utenti. Questi permettono di personalizzare il menu in base
all'utente che accede al sito.*/

class UserMenu extends Widget{

    constructor(username,privilegi){
        super("div","UserMenu") //Viene creato un tag di tipo div, associandogli la classe css "UserMenu"
        this.is_open = 0;   //Sta ad indicare che il menu a tendina è chiuso (è simile a un flag)
        this.opzioni = new MenuOptions(username)    //Crea un oggetto contenente le opzioni che verranno mostrate nel menu a tendina

        for (let i=0; i<this.opzioni[privilegi].length; i++)
            new MenuItem(this.opzioni[privilegi][i]["text"],this.opzioni[privilegi][i]["link"]).add(this.elemento)  //Aggiunge le voci al menu a tendina
    }

    /*Quando la funzione viene invocata si apre il menu a tendina*/

    open(){
        if (this.is_open==0)
        {
            this.elemento.style = "display:block";
            this.is_open += 2;
        }
    }

    /*Quando la funzione viene invocata si chiude il menu a tendina*/

    close(){
        if (this.is_open==1)
            this.elemento.style="display:none";
        if (this.is_open>0)
            this.is_open -= 1;
    }

}

/* La classe MenuItem implementa una singola voce del menu a tendina, che viene mostrato quando si preme il pulsante con l'icona dell'utente.
I parametri da passare al costruttore sono il testo della voce del menu, e il link da associarle.*/

class MenuItem extends Widget{
    constructor(text,link){
        super("p","MenuItem",text)  //Viene creato un tag di tipo p, associandogli la classe css "MenuItem"
        this.elemento.onclick = function (){cambiaPagina(link)};    //Alla pressione della voce si viene reindirizzati in una nuova pagina web
    }
}

/* L'oggetto MenuOptions svolge la funzione di dizionario. A seconda della chiave utilizzata (tipo di privilegi dell'utente)
viene visualizzato un diverso elenco di voci nel menu a tendina. Richiede come parametro l'username dell'utente, che viene
mostrato come prima voce del menu a tendina.*/

class MenuOptions{

    constructor (username){

        /*Le voci del dizionario hanno tutte la stessa struttura.
        Un campo contiene il testo che viene visualizzato nel menu a tendina,
        mentre l'altro contiene il link a cui si viene reindirizzati
        premendo il pulsante*/

        this.cliente = [
            {"text":username,"link":"/"},
            {"text":"I miei biglietti","link":"/"},
            {"text":"Log out","link":"/"}
        ]
        this.biglietteria = [
            {"text":username,"link":"/"},
            {"text":"Visualizza utenti","link":"/utenti"},
            {"text":"Log out","link":"/"}
        ]
        this.event_manager = [
            {"text":username,"link":"/"},
            {"text":"Crea nuovo evento","link":"/nuovo-evento"},
            {"text":"Modifica evento","link":"/"},
            {"text":"Log out","link":"/"}
        ]
    }
}