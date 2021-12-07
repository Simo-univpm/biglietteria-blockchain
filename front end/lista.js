const Info = require("./info")
const Table = require("./table")


class Lista
{

    constructor(valori,campi,text,empty_text,callback){

        if (valori.length>0){
            this.widget = new Table(text)  //Crea una nuova tabella
            this.widget.addHeader(campi)  //Aggiunge l'intestazione alla tabella

            for (let i=0; i<valori.length; i++)
            this.widget.addRecord(valori[i],campi,callback) //Aggiunge un record alla tabella
        }
        else
            this.widget = new Info(empty_text)

    }

    getWidget(){
        return this.widget
    }
    
}

module.exports = Lista;