
/*La classe Event crea il widget contenente i vari dati relativi ad un certo evento,
che viene mostrato nella pagina principale del sito. Il costruttore richiede come
parametri un oggetto contenente i dati relativi all'evento e i privilegi dell'utente,
che permettono di personalizzare il widget a seconda del tipo di utente che accede al sito.*/

class Event extends Widget{

    constructor(evento,privilegi){
        super("div","Event")    //Viene creato un tag di tipo div, associandogli la classe css "Event"
        new EventIcon(evento["immagine"]).add(this.elemento)    //Viene aggiunta l'icona dell'evento (colonna di sinistra)
        new EventData(evento,["luogo","data","posti_disponibili","orario","organizzatore"]).add(this.elemento)  //Vengono aggiunti i dettagli dell'evento (colonna centrale)
        new EventPrice(evento["prezzo"],evento["_id"],privilegi).add(this.elemento) //Vengono aggiunti il prezzo dell'evento e il pulsante (colonna destra)
    }
}

/*La classe EventIcon implementa il widget contenente l'icona dell'evento. Il costruttore richiede come
parametro il percorso dell'immagine da caricare.*/

class EventIcon extends Widget{

    constructor(image_path){
        super("div","EventIcon")    //Viene creato un tag di tipo div, associandogli la classe css "EventIcon"
        this.immagine = new Widget("img").add(this.elemento);   //Viene aggiunta l'immagine dell'evento al widget
        this.immagine.src = "immagini/"+image_path  //Viene impostato il percorso da cui leggere l'immagine
    }
}

/*La classe EventData implementa il widget contenente tutti i dettagli dell'evento. Il costruttore richiede come
parametro un oggetto contenente i dati dell'evento e la lista degli attributi da visualizzare.*/

class EventData extends Widget{

    constructor(evento,attributi){
        super("div","EventData")    //Viene creato un tag di tipo div, associandogli la classe css "EventData"
        this.titolo = new Widget("h1","EventTitle",evento.nome).add(this.elemento); //Viene aggiunto il titolo dell'evento
        for (let i=0; i<attributi.length; i++)  //Aggiunge i vari dati dell'evento ai campi
            new Widget("p","EventDetails",attributi[i].charAt(0).toUpperCase()+attributi[i].slice(1).replace("_"," ")+": "+evento[attributi[i]]).add(this.elemento);
    }
}

/*La classe EventPrice implementa il widget contenente il prezzo dell'evento e il pulsante per attivare le varie funzioni.
Il costruttore richiede come parametro il prezzo del biglietto per entrare all'evento, l'ID dell'evento e i privilegi
dell'utente (servono per personalizzare il widget in abse al tipo di utente).*/

class EventPrice extends Widget{

    constructor(prezzo,ID_evento,privilegi){
        super("div","EventPrice")   //Viene creato un tag di tipo div, associandogli la classe css "EventPrice"
        this.prezzo = new Widget("p","EventPriceValue",prezzo+" €\n").add(this.elemento);   //Viene aggiunto il valore del prezzo
        new EventButton(ID_evento,privilegi).add(this.elemento) //Viene aggiunto il pulsante
    }
}

/*La classe EventButton implementa il pulsante che permette di acquistare e gestire i biglietti a seconda dei privilegi dell'utente.
Il costruttore richiede come parametri l'ID dell'evento (viene passato come parametro nella query string del link) e i privilegi
dell'utente che permettono di personalizzare il pulsante in base al tipo di utente.*/

class EventButton extends Widget{
    constructor(ID_evento,privilegi) {
        super("button","EventButton")   //Viene creato un tag di tipo button, associandogli la classe css "EventButton"
        this.opzioni = new ButtonOptions(ID_evento) //Viene creato un dizionario che restituisce la pagina web da visualizzare a seconda dei privilegi
        this.elemento.textContent = this.opzioni[privilegi]["text"];    //Viene impostato il testo del pulsante
        this.elemento.link = this.opzioni[privilegi]["link"]    //Viene impostato il link del pulsante
        this.elemento.onclick = function () {cambiaPagina(this.link)}   //Funzione associata alla pressione del pulsante
    }
}

/* L'oggetto MButtonOptions svolge la funzione di dizionario. A seconda della chiave utilizzata (tipo di privilegi dell'utente)
viene visualizzato un diverso pulsante all'interno dell'evento. Richiede come parametro l'ID dell'evento, che viene utilizzato
come parametro delle query string nei link..*/

class ButtonOptions{

    constructor (ID_evento){

        /*Le voci del dizionario hanno tutte la stessa struttura.
        Un campo contiene il testo che viene visualizzato sul pulsante,
        mentre l'altro contiene il link a cui si viene reindirizzati
        premendo il pulsante*/

        this.cliente = {
            "text":"Acquista ora",
            "link":"/pagamento"
        }
        this.biglietteria = {
            "text":"Gestisci biglietti",
            "link":"/biglietti?id="+ID_evento
        }
        this.event_manager = {
            "text":"Apri vendite",
            "link":"/biglietti?id="+ID_evento
        }
    }
}