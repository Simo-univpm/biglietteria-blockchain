const CreaEvento = require("./creaEvento")


/*La classe implementa una pagina web contenente un semplice form che permette di aggiornare i dati
relativi ad un evento (nome, luogo, numero posti, ...). Le modifiche sono possibili solo se le vendite dei biglietti sono chiuse.

In fondo al form c'è un pulsante per inviare i dati al server e modificare l'evento.

Il costruttore richiede come parametro la mail dell'event manager e un oggetto contenente i dati dell'evento.

*/


class AggiornaEvento extends CreaEvento{

    constructor(email,data) {

        /* Il parametro data può essere un oggetto o una stringa (messaggio d'errore).
         
        Se il parametro è effettivamente un oggetto vengono aggiunti i dati dell'evento
        alle caselle di testo del this.form. */

        if(typeof data != 'string'){

            // Invoca il costruttore della super classe e genera un form

            super(email,"Aggiorna dati evento","PATCH",data["type"])


            // Disabilita il pulsante per inserire l'icona dell'evento (l'immagine non può essere modificata)
        
            this["Icona evento"].setAttribute("disabled","true")
            this["Icona evento"].setProperty("display","none")


            // Aggiunge i dati contenuti nel JSON all'interno del form

            Object.keys(data).forEach((key) => {if (Object.keys(this).includes(key.replaceAll("_"," "))) this[key.replaceAll("_"," ")].setAttribute("value","'"+data[key]+"'")})
        }

        else super(email)
    }

}



module.exports = AggiornaEvento;