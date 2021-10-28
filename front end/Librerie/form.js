
/*La classe Form permette di implementare un form all'interno delle pagine web.
Il costruttore richiede come parametri una lista di tutti gli elementi da inserire 
nel form (campi o pulsanti), l'indirizzo della pagina web cui si verrà reindirizzati
quando si inviano i dati del form, l'indirizze dell'api a cui inviare i dati del form
e l'id da associare al widget.*/

class Form extends Widget{

    constructor(items,next_page_url,api,id=null) {
        super("form","Form")    //Viene creato un tag di tipo div, associandogli la classe css "Form"
        this.elemento.action = 'javascript:sendData()'  //Funzione che viene attivata quando si preme il pulsante (invia i dati al server)
        this.next_page_url = next_page_url  //Imposta l'url
        this.api = api  //Imposta l'api
        this.elemento.id = id   //Imposta l'id
        this.campi = [] //Lista che va a contenere gli id dei campi da inviare al server
        for (let i=0;i<items.length;i+=1)
        {
            items[i].add(this.elemento) //Aggiunge l'elemento al form
            if (items[i] instanceof Field)
                this.campi.push(items[i])   //Se l'elemento è un campo, aggiunge il suo id a una lista
        }
    }

    async sendData(url,api)
    {
        let data = {}   //Istanzia un oggetto vuoto

        for (let i=0;i<this.campi.length;i+=1)
            data[this.campi[i]]=document.getElementById(this.campi[i]).value;   //Aggiunge il valore dei campi all'oggetto data

        await fetch(api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(value => {return value.json()}) //Richiesta post al server per inviare i dati

        //window.location.href=url;
    }
}

/*La classe Field implementa gli widget di tipo campo da inserire all'interno del form. Il costruttore 
richiede come parametri l'id da associare al campo, il nome del segnaposto, il testo da stampare se
viene inserito un input non valido, il tipo di campo e la funzione da chiamare quando cambia lo stato
del campo.*/

class Field extends Widget{
    constructor(id, placeholder, oninvalid="Riempire il campo", type="text", onchange=function () {this.setCustomValidity('')}) {
        super("input","Field")  //Viene creato un tag di tipo input, associandogli la classe css "Field"
        this.elemento.id = id;  //Imposta l'id
        this.elemento.placeholder = placeholder;    //Imposta il segnaposto
        this.elemento.required = "true";    //Specifica che il campo è obbligatorio
        this.elemento.oninvalid = function () {this.setCustomValidity(oninvalid)};  //Specifica la funzione che viene invocata quando si inserisce un dato non valido
        this.elemento.onchange = onchange;  //Imposta la funzione da chiamare quando cambia lo stato del campo
        this.elemento.type = type;  //Imposta il tipo dell'evento
    }
}

/*La classe FormButton implementa un pulsante da aggiungere al form per attivare una certa funzione.
Il costruttore richiede come parametri l'id da associare al pulsante, il testo del pulsante e la 
funzione da chiamare quando lo is preme.*/

class FormButton extends Widget{
    constructor(id,text,onclick=null) {
        super("button","FormButton",text)   //Viene creato un tag di tipo input, associandogli la classe css "FormButton"
        this.elemento.id = id;  //Imposta l'id
        this.elemento.onclick = onclick;    //Imposta la funzione da invocare alla pressione del pulsante
        if (this.elemento.onclick==null)
            this.elemento.type = "submit"   //Un pulsante di tipo submit, quando premuto invia i dati del form al server
        else
            this.elemento.type = "button"   //Un pulsante di tipo button, quando premuto esegue la funzione passata per parametro al costruttore
    }
}

/*La classe RadioButtons implementa un widget contenente un insieme di radio buttons. Il costruttore richiede come parametri
l'id da associare al widget e una lista di campi da visualizzare.*/

class RadioButtons extends Widget{
    constructor(id,campi) {
        super("p","RadioButtons")   //Viene creato un tag di tipo p, associandogli la classe css "RadioButtons"
        this.elemento.id = id;  //Imposta l'id
        let button; 
        for (let i=0;i<campi.length;i+=1)
        {
            button = new Widget("input","Radio").add(this.elemento) //Viene creato un tag di tipo input, associandogli la classe css "Radio" (singolo bottone)
            button.type = "radio"   //Imposta il tipo di inpu
            button.name = "radio",  //Imposta il nome del bottone (serve per raggruppare insieme i bottoni)
            button.value = campi[i],    //Imposta il valore
            button.required = "true",   //Il campo è obbligatorio
            button.contenitore = this.elemento  //Aggiunge un riferimento al contenitore
            button.oninput = function () {button.contenitore.value=this.elemento.value} //Quando si sceglie un bottone, il valore verrà salvato
            this.elemento.appendChild(document.createTextNode(campi[i]))    //Aggiunge il testo
        }
    }
}