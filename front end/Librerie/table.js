
/*La classe Table implementa una tabella che può essere utilizzata per visualizzare
dati come eventi, biglietti emessi, utenti, ... Il costruttore richiede come parametro
un oggetto contenente tutti i valori da aggiungere nella tabella, il titolo della tabella
e il testo da mostrare quando la tabella è vuota.*/

class Table extends Widget{

    constructor(valori,header_text,empty_table_text){

        if (valori.length>0)    //Se la tabella non è vuota viene creato un opportuno widget
        {
            super("table","Table")  //Viene creato un tag di tipo table, associandogli la classe css "Table"
            this.campi = Object.keys(valori[0]) //Ottiene i campi dell'oggetto (intestazione tabella)
            this.titolo = new Widget("H1","TableTitle",header_text).add(this.elemento)  //Viene creato un tag di tipo H1, associandogli la classe css "TableTitle" (titolo della tabella)
            this.intestazione = new Widget("tr").add(this.elemento) //Viene creato un tag di tipo tr (intestazione tabella)
            
            for (let j=0; j<this.campi.length; j++)
                new Widget("th","TableHeader",this.campi[j].charAt(0).toUpperCase()+this.campi[j].slice(1).replace("_"," ")).add(this.intestazione);    //Aggiunge i campi all'intestazione
            
            for (let i=0; i<valori.length; i++)
            {
                const riga = new Widget("tr").add(this.elemento);   //Viene creato un tag di tipo tr (riga tabella)
                for (let j=0; j<this.campi.length; j++)
                    new Widget("th","TableField",valori[i][this.campi[j]]).add(riga);   //Aggiunge il valore dei campi ad ogni riga della tabella
            }
        }
        else    //Se la tabella è vuota viene mostrato un opportuno messaggio
        {
            super("h5","EmptyTable")    //Viene creato un tag di tipo h5, associandogli la classe css "EmptyTable"
            this.elemento.textContent = empty_table_text    //Si imposta il testo del tag
        }
        
    }
}