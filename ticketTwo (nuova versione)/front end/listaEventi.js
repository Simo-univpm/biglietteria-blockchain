const Widget = require("../front end/widget")
const Event = require("../front end/event")


/*La classe ListaEventi implementa un contenitore in cui sono contenuti tutti gli eventi
relativi ad una certa categoria.

Il costruttore richiede come parametri una lista contenente gli eventi da mostrare e i privilegi
associati all'utente del sito web. A seconda del tipo di privilegi vengono mostrate delle diverse
opzioni per gli utenti. */

class ListaEventi extends Widget{

    constructor(eventi,privilegi){

        super("div")    //Viene creato un tag di tipo div

        //Crea la copertina della pagina (immagine posta sotto la navigation bar)

        const copertina = new Widget("img") //Crea un tag di tipo img
        copertina.setAttribute("src","copertina.png")   //Imposta la sorgente dell'immagine
        copertina.setProperty("width","100%")   //Lunghezza dell'immagine
        copertina.setProperty("padding-bottom","5px");  //Padding in basso
        copertina.setProperty("margin-bottom","20px");  //Margine dal basso
        copertina.setProperty("background-color","var(--tema)");    //Imposta il colore dello sfondo
        this.addChild(copertina)    //Aggiunge la copertina al contenitore

        //Aggiunge gli eventi alla lista

        for (let i=0; i<eventi.length; i+=1){
            const evento = new Event(eventi[i]) //Crea un nuovo evento

            if (privilegi==null){
                evento.addPrice()   //Aggiunge il prezzo all'evento
                evento.addButton("Accedi e acquista","'/login'")    //Aggiunge il pulsante per accedere all'area riservata
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore"])   //Specifica i campi dell'evento da mostrare
            }

            else if (privilegi==0){
                evento.addPrice()   //Aggiunge il prezzo all'evento
                evento.addButton("Acquista ora","'/acquista?id="+eventi[i].eventID+"'") //Aggiunge il pulsante per acquistare un biglietto
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore"])   //Specifica i campi dell'evento da mostrare
            }

            else if (privilegi==1){
                evento.addButton("Modifica evento","'/modify-event?id="+eventi[i].eventID+"'")  //Aggiunge il pulsante per modificare un evento

                //!!!Da sistemare
                //Gestione biglietti andrebbe mostrato solo se i biglietti sono in vendita?????
                //Gestione ingressi andrebbe mostrato solo una volta iniziato l'evento???????

                evento.addButton("Gestione biglietti","'/biglietti'")
                evento.addButton("Gestione ingressi","'/ingressi'")
                evento.addData(["luogo","data","posti_disponibili","orario","eventCreationDate","eventCreationTime","prezzo"])  //Specifica i campi dell'evento da mostrare
            }
                
            else if (privilegi==2){
                evento.addButton("Apri vendite","'/api/pay/apri-vendite?id="+eventi[i].eventID+"'") //Aggiunge il pulsante per aprire le vendite dei biglietti
                evento.addButton("Gestione biglietti","'/biglietti'")
                evento.addButton("Gestione ingressi","'/ingressi'")
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore","eventCreationDate","eventCreationTime","prezzo"])  //Specifica i campi dell'evento da mostrare
            }
            
            else if (privilegi==3){
                evento.addButton("Invalida biglietti","'/annulla-biglietti'")   //Aggiunge il pulsante per modificare un evento
                evento.addButton("Gestione biglietti","'/biglietti'")
                evento.addButton("Gestione ingressi","'/ingressi'")
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore","eventCreationDate","eventCreationTime","prezzo"])  //Specifica i campi dell'evento da mostrare
            }

            this.addChild(evento)   //Aggiunge l'evento alla lista 
        }
        
    }

}



module.exports = ListaEventi;