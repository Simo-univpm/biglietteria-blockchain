
/*La classe Widget implementa un generico widget a partire dai tag HTML. I parametri del costruttore
sono il tipo di tag, la classe CSS da associare al tag e il testo da inserire nel tag.*/

class Widget
{
    //Viene creato un tag HTML generico

    constructor(tag_name,text=null){
        this.name = tag_name
        this.children = []
        this.attributi = Object()
        this.stile = Object()
        this.text = text    //Si imposta il testo del tag
    }

    addChild(child){
        this.children.push(child)  //Aggiunge il widget (tag) passato per parametro come figlio
    }

    setAttribute(attributo,valore){
        this.attributi[attributo] = valore
    }

    setProperty(proprietà,valore){
        this.stile[proprietà] = valore
    }

    get(){
        let tag = "<"+this.name
        const proprietà = Object.keys(this.stile)
        if (proprietà.length>0){
            this.attributi.style = '"'
            for (let i=0;i<proprietà.length;i+=1)
                this.attributi.style += proprietà[i]+":"+this.stile[proprietà[i]]+"; "
                this.attributi.style += '"'
        }
        const attributi = Object.keys(this.attributi)
        for (let i=0;i<attributi.length;i+=1)
            tag += " "+attributi[i]+"="+this.attributi[attributi[i]]
        tag += ">"
        if (this.text!=null)
            tag += this.text
        for (let i=0;i<this.children.length;i+=1)
            tag += this.children[i].get()
        tag += "</"+this.name+">"
        return tag
    }

}

module.exports = Widget;