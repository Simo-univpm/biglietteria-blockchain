const Widget = require("../widget")


/*La classe Form permette di implementare un form all'interno delle pagine web.
Il costruttore richiede come parametro l'azione (script javascript lato client) da eseguire
quando viene premuto il pulsante invio. 

Eredita dalla classe Widget.*/

class Form extends Widget{

    //Costruisce il form
    
    constructor(api,reqType,redirect_url) {

        // Viene generato un tag di tipo form

        super("form")
        

        // Viene aggiunto il modulo javascript necessario al funzionamento del widget
        
        this.addScript("form")

        const args = redirect_url ? '"'+api+'","'+reqType+'","'+redirect_url+'"' : '"'+api+'","'+reqType+'"'
        this.setAttribute("action","'javascript: sendDataToServer("+args+")'")  //Imposta la funzione che viene attivata quando si preme il pulsante (invia i dati al server)
        this.setProperty("background-color","rgba(225,236,245,255)")  //Colore di sfondo del form
        this.setProperty("margin","auto") //Distanza del form dal bordo sinistro
        this.setProperty("margin-top","11vw") //Distanza del form dal bordo in alto
        this.setProperty("width","50vw") //Lunghezza del form
        this.setProperty("padding","1.6vw") //Spazio intorno al form
        this.setProperty("border-radius","2vw") //Raggio del bordo del form (rende il form arrotondato)
        this.setProperty("font-family","'Signika', sans-serif") //Font usato nel form
    }



    /*La funzione permette di inserire un nuovo campo all'interno del form. La funzione richiede 
    come parametri: il placeholder che viene mostrato nel campo, il tipo 
    di campo (testo, data, orario, ...) e l'altezza del campo.*/


    addField(placeholder,type="text",heigth="3.6vw")  {

        const field = new Widget("input")

        field.setAttribute("id",placeholder.replaceAll(" ","_"));   //Imposta l'id
        field.setAttribute("name","field");  //Imposta il nome del campo
        field.setAttribute("placeholder","'"+placeholder+"'");    //Imposta il segnaposto
        field.setAttribute("required","true");    //Specifica che il campo è obbligatorio
        field.setAttribute("type",type);  //Imposta il tipo dell'evento
        if (type == "file") field.setAttribute("oninput","read(this)")

        field.setProperty("font-size","1.1vw") //Dimenzione del testo del campo
        field.setProperty("height",heigth) //Altezza del campo
        field.setProperty("width",this.stile.width) //Lunghezza del campo
        field.setProperty("padding-left","1vw") //Spazio a sinistra del campo
        field.setProperty("margin-top","0.4vw") //Distanza del campo dal bordo in alto
        field.setProperty("border","0.1vw solid #ccc") //Tipo di bordo del campo
        field.setProperty("border-radius","1vw") //Raggio del bordo del campo (rende il campo arrotondato)

        this.addChild(field)

        return field
    }



    /*La funzione permette di inserire un nuovo campo nascosto all'interno del form.*/


    addHiddenField(placeholder,type,heigth){

        const field = this.addField(placeholder,type,heigth)    //Aggiunge il campo
        field.setAttribute("disabled","true")   //Disabilita il campo
        field.setProperty("display","none")     //Nasconde il campo

        return field
    }



    /*La funzione permette di inserire un nuovo pulsante all'interno del form. La funzione richiede come parametri: 
    il testo del pulsante e la funzione da invocare alla pressione del pulsante (è una funzione che viene
    eseguita lato client!!!). */


    addButton(text,onclick=null){

        const button = new Widget("input") //Viene creato un tag di tipo input
        button.setAttribute("value","'"+text+"'");  //Imposta il testo del pulsante
        button.setAttribute("name","button");  //Imposta il nome del campo
        
        if (onclick==null) button.setAttribute("type","submit")   //Un pulsante di tipo submit, quando premuto invia i dati del form al server
        else{

            button.setAttribute("type","button")   //Un pulsante di tipo button, quando premuto esegue la funzione passata per parametro al costruttore
            button.setAttribute("onclick",onclick);    //Imposta la funzione da invocare alla pressione del pulsante
        }   

        button.setProperty("border","hidden") //Tipo di bordo del pulsante
        button.setProperty("border-radius","1vw") //Raggio del bordo del pulsante (rende il pulsante arrotondato)
        button.setProperty("padding","1vw") //Spazio intorno al pulsante
        button.setProperty("background-color","var(--tema)") //Colore di sfondo del pulsante
        button.setProperty("color","rgb(255, 255, 255)") //Colore del testo del pulsante
        button.setProperty("width",this.stile.width) //Lunghezza del pulsante
        button.setProperty("text-align","center") //Allineamento del testo
        button.setProperty("cursor","pointer") //Modifica il tipo di puntatore quando si passa sopra al pulsante
        button.setProperty("font-size","1.1vw") //Dimensione del testo del pulsante
        button.setProperty("margin-top","0.6vw") //Distanza del pulsante dal bordo in alto

        this.addChild(button)   //Aggiunge il pulsante al form
        
        return button
    }




    /*La funzione permette di inserire un gruppo di radio buttons all'interno del form. La funzione richiede come parametri: 
    l'id da associare ai radio buttons e una lista di campi (i campi dei radio buttons). La funzione presenta anche un terzo
    parametro opzionale. Se questo è impostato a true al posto del testo dei radio buttuns vengono visualizzate delle
    immagini png.*/


    addRadioButtons(id,campi,checked,images=false){

        const radio_buttons = new Widget("object")   //Viene creato un tag di tipo p
        radio_buttons.setAttribute("id",id);  //Imposta l'id
        radio_buttons.setAttribute("name","field");  //Imposta il nome del campo

        radio_buttons.setProperty("color","rgb(153, 148, 148)") //Colore del testo dei radio buttons
        radio_buttons.setProperty("margin-top","1.2vw")   //Distanza dei radio buttons dall'alto
        radio_buttons.setProperty("margin-bottom","0.8vw")    //Distanza dei radio buttons dal basso
        radio_buttons.setProperty("margin-left","-3vw")     //Margini da sinistra
        radio_buttons.setProperty("font-size","1.1vw")
        radio_buttons.setProperty("display","flex")
        radio_buttons.setProperty("justify-content","center")
        
        //Aggiunge i radio buttons al contenitore

        campi.forEach(campo => {
            
            radio_buttons.addChild(new Widget("input",campo),button => {

                if (images) button.addChild(new Widget("img"),image => {

                    button.text = null
                    image.setAttribute("src","/images/"+campo+".png") //Imposta la sorgente dell'immagine
                    image.setProperty("width","4.6vw") //Imposta la lunghezza
                })

                button.setAttribute("valore","'"+campo+"'")    //Imposta il valore
                button.setAttribute("type","radio")   //Imposta il tipo di input
                button.setAttribute("name",id)   //Imposta il nome del bottone (serve per raggruppare insieme i bottoni)
                button.setAttribute("required","true")   //Il campo è obbligatorio
                button.setAttribute("oninput","this.parentNode.value=this.getAttribute('valore')")   //Quando si sceglie un bottone, il valore verrà salvato
                
                // Se il parametro checked è definito si imposta un radio button di default

                if (checked == campo){
                    button.setAttribute("checked","true")   // Attiva il radio button
                    this.setAttribute("onsubmit","document.getElementById('"+id+"').value==undefined?document.getElementById('"+id+"').value='"+campo+"':false") // Imposta il valore del radio button come valore scelto
                }

                button.setProperty("width","1.8vw")
                button.setProperty("font-size","1.1vw")
                button.setProperty("margin-left","2vw")
            })
        })

        this.addChild(radio_buttons)    //Aggiunge i radio buttons al form

        return radio_buttons
    }



    /* La funzione inserisce un oggetto nel form, che visualizza un messaggio nel caso si verifichi
    un errore. */


    addInfoMessage(color="var(--tema)",font_size="1.1vw"){

        this.addChild(new Widget("H5","Attendere"), load_message => {

            load_message.addChild(new Widget("img"), load => {

                load.setAttribute("src","/images/loading.gif")
                load.setAttribute("id","load")   //Imposta l'id del tag
                load.setProperty("width",font_size)
                load.setProperty("margin-left","0.8vw")
            })

            load_message.setAttribute("id","load")   //Imposta l'id del tag

            load_message.setProperty("color",color) //Colore del testo
            load_message.setProperty("font-size",font_size) //Dimensione del testo
            load_message.setProperty("text-align","center")
            load_message.setProperty("margin-bottom","0.8vw")
            load_message.setProperty("display","none") //Il widget non viene mostrato (viene visualizzato solo in caso di errore)
        })

        const message = new Widget("H5","I dati inseriti non sono validi")

        message.setAttribute("id","info")   //Imposta l'id del tag

        message.setProperty("color",color) //Colore del testo
        message.setProperty("font-size",font_size) //Dimensione del testo
        message.setProperty("text-align","center")
        message.setProperty("margin-bottom","0.8vw")
        message.setProperty("display","none") //Il widget non viene mostrato (viene visualizzato solo in caso di errore)

        this.addChild(message) //Aggiunge il widget al form

        return message

    }



    /*La funzione aggiunge il logo del sito al form. Si può specificare come parametro il testo da
    mostarre vicino al logo. */

    addLogo(text){

        //Aggiunge il logo al form
        
        this.addChild(new Widget("img"),logo => {

            logo.setAttribute("src","/images/form_logo.png")    //Imposta la sorgente dell'immagine
            logo.setProperty("width","22vw")    //Lunghezza dell'immagine
        })    

        const text_box = new Widget("p",text)   //Crea una casella di testo
        text_box.setProperty("font-family","Arial Rounded MT Bold") //Set di caratteri
        text_box.setProperty("font-size","1.3vw")   //Dimensione del testo
        text_box.setProperty("color","rgb(69,74,117)")  //Colore del testo
        text_box.setProperty("margin-top","-1.8vw") //Margini dall'alto
        text_box.setProperty("margin-left","4.8vw") //Margini da sinistra
        this.addChild(text_box)

        return text_box
    }



    /*La funzione aggiunge il testo passato per parametro al form.*/


    addText(text){

        const label = new Widget("p",text)  //Crea un tag di tipo p
        label.setProperty("text-align","center"); //Imposta l'allineamento del testo
        label.setProperty("color","rgb(133, 127, 127)");  //Imposta il colore del testo
        label.setProperty("margin-bottom","2vw");  //Imposta il margine dal basso
        this.addChild(label)
        return label
    }



    /*La funzione aggiunge un separatore al form. */

    addSeparator(){

        //Viene creato un tag di tipo hr (separatore)
        
        this.addChild(new Widget("hr"),separatore => {

            separatore.setProperty("width",this.stile.width) //Lunghezza del separatore
            separatore.setProperty("margin-left","0.5vw") //Distanza da sinistra
            separatore.setProperty("border-top","0.1vw solid #bbb") //Tipo di bordo
            separatore.setProperty("border-radius","2vw") //Raggio del bordo (rende il separatore arrotondato)
            separatore.setProperty("margin-top","1vw") //Distanza dall'alto
            separatore.setProperty("margin-bottom","1vw") //Distanza dal basso
        })
    }
}



module.exports = Form;