
/*La classe Widget implementa un generico widget a partire dai tag HTML. I parametri del costruttore
sono il tipo di tag e il testo (parametro opzionale) da inserire nel tag.*/


class Widget
{
    //Viene creato un tag HTML generico

    constructor(tag_name,text=null){

        //imposta il nome del tag

        this.name = tag_name    

        //Lista dei figli del tag

        this.children = []  

        //Oggetto che andrà a contenere gli attrbuti del tag HTML

        this.attributi = Object()   

        //Set che va a contenere gli script necessari per il funzionamento del widget
        //(L'utilizzo di un set impedisce che uno script sia importato più volte)

        this.scripts = new Set()

        //Oggetto che andrà a contenere le proprietà css associate al tag HTML

        this.stile = Object()   

        //Imposta il testo del tag

        this.text = text    
    }



    /*La funzione aggiunge l'elemento passato per parametro (deve essere un oggetto della classe widget)
    come figlio del widget (viene costruito il sottoalbero associato al widget).*/
    

    addChild(child,callback){
        if (callback!= undefined) callback(child)
        this.children.push(child)  //Aggiunge il widget (tag) passato per parametro alla lista dei figli
    }



    /*La funzione permette di impostare il valore degli attributi del tag HTML. Il primo parametro indica
    il nome dell'attributo, il secondo il suo valore. */


    setAttribute(attributo,valore){
        this.attributi[attributo] = valore  //Imposta il valore dell'attributo
    }



    /*La funzione permette di impostare il valore delle proprietà CSS associate al tag HTML. Il primo parametro indica
    il nome della proprietà, il secondo il suo valore. */


    setProperty(proprietà,valore){
        this.stile[proprietà] = valore  //Imposta il valore della proprietà CSS
    }



    /*La funzione permette di aggiungere un modulo di codice javascript da associare alla pagina HTML. Le funzioni
    contenute nel modulo verranno eseguite dal browser del client. */

    addScript(nome_modulo){
        this.scripts.add("/"+nome_modulo+".js")
    }



    /*La funzione restituisce una lista dei nomi dei moduli javascript necessari al funzionamento del widget*/


    getScripts(){
        this.children.forEach(child => child.getScripts().forEach(script => this.scripts.add(script)))
        return this.scripts
    }



    /*La funzione a partire dalle variabili d'istanza associate all'oggetto crea il tag HTML vero e proprio
    restituendo una stringa contenente il contenuto del tag. */

    
    get(){

        //Aggiunge le varie proprietà CSS all'interno di una stringa (l'attributo style del tag)

        this.attributi.style = ['"'].concat(Object.entries(this.stile)).reduce((style,property) => style += property[0]+":"+property[1]+"; ")+'"'

        //Aggiunge i vari attributi all'interno del tag (tra le parentesi angolari)

        let tag = ["<"+this.name].concat(Object.entries(this.attributi)).reduce((tag,attributo) => tag += " "+attributo[0]+"="+attributo[1])+">"

        //Se il widget contiene del testo, lo si aggiunge dopo le parentesi angolari

        if (this.text) tag += this.text

        //Si aggiungono i figli del tag

        this.children.forEach(child => tag += child.get())

        //Chiude il tag
        
        tag += "</"+this.name+">"

        return tag
    }

}



module.exports = Widget;