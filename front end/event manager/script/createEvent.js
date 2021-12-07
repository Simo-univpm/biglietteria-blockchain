
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, utilizzate dagli organizzatori per creare un nuovo evento*/


/*Questa funzione permette ad un client con privilegi da event manager di creare un nuovo evento. La funzione prende
i valori dei campi contenuti nel form dell'evento e li invia al server tramite una richiesta HTTP di 
tipo POST. Se la creazione dell'evento ha successo il client viene reindirizzato alla pagina precedente, altrimenti
viene stampato un opportuno messaggio d'errore*/


async function createEvent(){

    const data = getFormData()
       
    data.Icona_evento = await readImage(document.getElementById("Icona_evento"))    //Legge l'immagine dal file system del client (l'immagine viene memorizzata come una stringa binaria base64)
    
    const status = await fetch("/api/events",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/eventi?type=Cinema"   //Se la creazione dell'evento ha successo, il client viene reindirizzato alla pagina precedente
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}

/*La funzione legge il file contenuto al percorso passato per argomento e restituisce il suo contenuto
sotto forma di stringa binaria base64. La funzione viene utilizzata per fare l'upload di un'immagine da parte di un client.*/


function readImage(file) {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();  //Istanzia un oggetto di tipo FileReader
  
      reader.onload = res => {
        resolve(res.target.result); //Terminata l'esecuzione della funzione asincrona viene risolta la promessa
      };
      reader.onerror = err => reject(err);  //Gestisce le eccezioni
      reader.readAsDataURL(file.files[0]);   //Legge il file in maniera aincrona
    });
}