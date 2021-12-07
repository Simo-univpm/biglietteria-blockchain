
/*La classe Widget implementa un generico widget a partire dai tag HTML. I parametri del costruttore
sono il tipo di tag e il testo (parametro opzionale) da inserire nel tag.*/


class Widget
{
    //Viene creato un tag HTML generico

    constructor(tag_name,text=null){
        this.name = tag_name    //imposta il nome del tag
        this.children = []  //Lista dei figli del tag
        this.attributi = Object()   //Oggetto che andrà a contenere gli attrbuti del tag HTML
        this.stile = Object()   //Oggetto che andrà a contenere le proprietà css associate al tag HTML
        this.text = text    //Imposta il testo del tag
    }

    /*La funzione aggiunge l'elemento passato per parametro (deve essere un oggetto della classe widget)
    come figlio del widget (viene costruito il sottoalbero associato al widget).*/
    

    addChild(child){
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

    /*La funzione a partire dalle variabili d'istanza associate all'oggetto crea il tag HTML vero e proprio
    restituendo una stringa contenente il contenuto del tag. */

    get(){
        let tag = "<"+this.name     //Inserisce il nome del tag
        const proprietà = Object.keys(this.stile)   //Ottiene la lista delle proprietà CSS dichiarate

        //Se è stata dichiarata almeno una proprietà...

        if (proprietà.length>0){
            this.attributi.style = '"'

            //Aggiunge le varie proprietà CSS all'interno di una stringa (l'attributo style del tag)

            for (let i=0;i<proprietà.length;i+=1)
                this.attributi.style += proprietà[i]+":"+this.stile[proprietà[i]]+"; "
                this.attributi.style += '"'
        }

        const attributi = Object.keys(this.attributi)   //Ottiene la lista degli attributi CSS dichiarati

        //Aggiunge i vari attributi all'interno del tag (tra le parentesi angolari)

        for (let i=0;i<attributi.length;i+=1)
            tag += " "+attributi[i]+"="+this.attributi[attributi[i]]
        tag += ">"

        //Se il widget contiene del testo, lo si aggiunge dopo le parentesi angolari

        if (this.text!=null)
            tag += this.text

        //Si aggiungono i figli del tag

        for (let i=0;i<this.children.length;i+=1)
            tag += this.children[i].get()

        tag += "</"+this.name+">"   //Chiude il tag

        return tag
    }

}



module.exports = Widget;