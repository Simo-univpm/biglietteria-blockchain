const Widget = require("../front end/widget")

/*La classe Form permette di implementare un form all'interno delle pagine web.
Il costruttore richiede come parametri una lista di tutti gli elementi da inserire 
nel form (campi o pulsanti), l'indirizzo della pagina web cui si verrà reindirizzati
quando si inviano i dati del form, l'indirizze dell'api a cui inviare i dati del form
e l'id da associare al widget.*/

class Form extends Widget{
    
    constructor(action) {
        super("form")    //Viene creato un tag di tipo div, associandogli la classe css "Form"
        this.setAttribute("action",action)  //Imposta la funzione che viene attivata quando si preme il pulsante (invia i dati al server)
        this.setProperty("background-color","rgb(255, 255, 255)") /*Colore di sfondo del form*/ 
        this.setProperty("margin-top","14%") /*Distanza del form dal bordo in alto*/
        this.setProperty("margin-left","25%") /*Distanza del form dal bordo sinistro*/
        this.setProperty("width","50%") /*Lunghezza del form*/
        this.setProperty("padding","20px") /*Spazio intorno al form*/
        this.setProperty("border-radius","10px") /*Raggio del bordo del form (rende il form arrotondato)*/
        this.setProperty("font-family","'Signika', sans-serif") /*Font usato nel form*/
    }

    /*La classe Field implementa gli widget di tipo campo da inserire all'interno del form. Il costruttore 
    richiede come parametri l'id da associare al campo, il nome del segnaposto, il testo da stampare se
    viene inserito un input non valido, il tipo di campo e la funzione da chiamare quando cambia lo stato
    del campo.*/

    addField(id,placeholder,type="text")  {
        const field = new Widget("input")  //Viene creato un tag di tipo input, associandogli la classe css "Field"
        field.setAttribute("id",id);  //Imposta l'id
        field.setAttribute("placeholder",placeholder);    //Imposta il segnaposto
        field.setAttribute("required","true");    //Specifica che il campo è obbligatorio
        field.setAttribute("type",type);  //Imposta il tipo dell'evento
        field.setProperty("font-size","100%") /*Dimenzione del testo del campo*/
        field.setProperty("height","48px") /*Altezza del campo*/
        field.setProperty("width","99%") /*Lunghezza del campo*/
        field.setProperty("padding-left","5%") /*Spazio a sinistra del campo*/
        field.setProperty("margin-top","10px") /*Distanza del campo dal bordo in alto*/
        field.setProperty("margin-left","0.5%") /*Distanza del campo dal bordo sinistro*/
        field.setProperty("border","1px solid #ccc") /*Tipo di bordo del campo*/
        field.setProperty("border-radius","10px") /*Raggio del bordo del campo (rende il campo arrotondato)*/
        this.addChild(field)
        return field
    }

    /*La classe FormButton implementa un pulsante da aggiungere al form per attivare una certa funzione.
    Il costruttore richiede come parametri l'id da associare al pulsante, il testo del pulsante e la 
    funzione da chiamare quando lo is preme.*/

    addButton(text,onclick=null){
        const button = new Widget("input") //Viene creato un tag di tipo input, associandogli la classe css "FormButton"
        button.setAttribute("value",text);
        button.setProperty("border","hidden") /*Tipo di bordo del pulsante*/
        button.setProperty("border-radius","10px") /*Raggio del bordo del pulsante (rende il pulsante arrotondato)*/
        button.setProperty("padding","12px") /*Spazio intorno al pulsante*/
        button.setProperty("background-color","rgb(66,183,42)") /*Colore di sfondo del pulsante*/
        button.setProperty("color","rgb(255, 255, 255)") /*Colore del testo del pulsante*/
        button.setProperty("width","100%") /*Lunghezza del pulsante*/
        button.setProperty("text-align","center") /*Allineamento del testo*/
        button.setProperty("cursor","pointer") /*Modifica il tipo di puntatore quando si passa sopra al pulsante*/
        button.setProperty("font-size","100%") /*Dimensione del testo del pulsante*/
        if (onclick==null)
            button.setAttribute("type","submit")   //Un pulsante di tipo submit, quando premuto invia i dati del form al server
        else
            button.setAttribute("type","button")   //Un pulsante di tipo button, quando premuto esegue la funzione passata per parametro al costruttore
            button.setAttribute("onclick",onclick);    //Imposta la funzione da invocare alla pressione del pulsante
        this.addChild(button)
        return button
    }

    /*La classe RadioButtons implementa un widget contenente un insieme di radio buttons. Il costruttore richiede come parametri
    l'id da associare al widget e una lista di campi da visualizzare.*/

    addRadioButtons(id,campi){
        const radio_buttons = new Widget("p")   //Viene creato un tag di tipo p, associandogli la classe css "RadioButtons"
        radio_buttons.setAttribute("id",id);  //Imposta l'id
        radio_buttons.setProperty("color","rgb(153, 148, 148)") /*Colore del testo dei radio buttons*/
        radio_buttons.setProperty("width","100%") /*Lunghezza del contenitore dei radio buttons*/
        radio_buttons.setProperty("margin-top","20px") /*Distanza del contenitore dei radio buttons dal bordo in alto*/
        let button;
        for (let i=0;i<campi.length;i+=1){
            button = new Widget("input",campi[i])
            button.setAttribute("valore","'"+campi[i]+"'")    //Imposta il valore
            button.setAttribute("type","radio")   //Imposta il tipo di input
            button.setAttribute("name",id)   //Imposta il nome del bottone (serve per raggruppare insieme i bottoni)
            button.setAttribute("required","true")   //Il campo è obbligatorio
            button.setAttribute("oninput","this.parentNode.value=this.getAttribute('valore')")   //Quando si sceglie un bottone, il valore verrà salvato
            button.setProperty("margin-left","6%") /*Distanza del radio button da sinistra*/
            button.setProperty("margin-right","10px") /*Distanza del radio button da destra*/
            radio_buttons.addChild(button)
        }
        this.addChild(radio_buttons)
        return radio_buttons
    }

    addInfoMessage(text){
        const message = new Widget("H5",text) //Viene creato un tag di tipo label
        message.setAttribute("id","info")
        message.setProperty("color","red") /*Colore del testo*/
        message.setProperty("font-size","96%") /*Dimensione del testo*/
        message.setProperty("display","none") /*Distanza da sinistra*/
        this.addChild(message)
        return message
    }
}

module.exports = Form;