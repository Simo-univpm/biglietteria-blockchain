
/*La classe password dimenticata implementa il pulsante da premere quando
si dimentica la password dell'account. Viene inserito nella pagina di login*/

class PasswordDimenticata{
    constructor(){
        this.label = new Widget("label","PasswordDimenticata","Password dimenticata?"); //Viene creato un tag di tipo label, associandogli la classe css "PasswordDimenticata"
        this.separatore = new Widget("hr","Separatore");    //Viene creato un tag di tipo hr, associandogli la classe css "Separatore"
    }
    
    add(parent){
        this.label.add(parent); //Aggiunge l'etichetta al genitore
        this.separatore.add(parent);    //Aggiunge il separatore al genitore
        return this.label   //Restituisce un riferimento all'etichetta
    }
}