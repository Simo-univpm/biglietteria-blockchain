
/*La classe Widget implementa un generico widget a partire dai tag HTML. I parametri del costruttore
sono il tipo di tag, la classe CSS da associare al tag e il testo da inserire nel tag.*/

class Widget
{
    constructor(tag,classe=null,text=null){
        this.elemento=document.createElement(tag);  //Viene creato un tag HTML generico
        this.elemento.className = classe;   //Si associa una classe CSS al tag
        this.elemento.textContent = text;   //Si imposta il testo del tag
    }

    add(parent){
        parent.appendChild(this.elemento);  //Aggiunge il widget (tag) al widget passato per parametro
        return this.elemento
    }
}

function cambiaPagina(url)
    {window.location.href=url}