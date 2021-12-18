
/* Questa funzione permette di visualizzare un messaggio informativo
all'interno di un form.

La funzione richiede come parametro il testo del messaggio da mostrare.
*/


function showInfo(text){

    // Ottiene un riferimento all'elemento che contiene il messaggio

    const info = document.getElementById("info")


    // Imposta il testo del messaggio

    if (text != undefined) info.textContent = text


    // Visualizza il messaggio

    info.style.setProperty("display","block")
}



/* Questa funzione permette di inviare al server i dati inseriti in un form.

La funzione richiede come parametri:
    - l'indirizzo dell'api a cui inviare i dati,
    - il tipo di richiesta HTTP (POST, PATCH, DELETE)
    - l'indirizzo a cui reindirizzare il client una volta ottenuta la risposta del server.
*/


async function sendDataToServer(api,reqType,redirect_url){

    // Legge il parametro id dalla query string

    const data = {id: new URLSearchParams(window.location.search).get("id")}


    // Ottiene i dati inseriti nel form

    const campi = document.forms[0].elements["field"]


    // Inserisce i dati del form nell'oggetto data

    if (campi) if (campi.length) campi.forEach(campo => data[campo.id] = campo.type == "file" ? campo.content : campo.value);
    else data[campi.id] = campi.value

    const loader = document.getElementById("load")

    // Invia una richiesta al server, allegando nel body i dati inseriti nel form

    loader.style.setProperty("display","block")
    
    const response = await fetch(api,{method:reqType, headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})

    loader.style.setProperty("display","none")


    // Se la richiesta viene eseguita con successo il client viene reindirizzato in una nuova pagina web

    if (response.status==200){

        // Memorizza nei cookies eventuali token ricevuti in risposta dal server (ex. token autenticazione, ...)

        new Array(["auth-token",3600],["OTP-token",60]).forEach(token => document.cookie = response.headers.get(token[0]) ? token[0]+'='+response.headers.get(token[0])+';expires='+(new Date(Date.now()+token[1]*1000)).toUTCString()+';path=/' : undefined);
        
        
        // Reindirizza il client in una nuova pagina web
        
        window.location.href = redirect_url ? redirect_url : await response.text()
    }

    //Altrimenti viene mostrato un opportuno messaggio d'errore

    else showInfo(await response.text())
}



/*Questa funzione controlla se il campo contenente la password corrisponde 
al campo contenente la conferma della password.

La funzione richiede come parametro un riferimento al campo in cui viene 
inserita la conferma della password.

*/


function confermaPassword(conferma_password)
{   
    //Se le password non coincidono viene stampato un opportuno messaggio d'errore
    
    conferma_password.setCustomValidity(document.getElementById('Password').value != conferma_password.value ? "Le due password non coincidono" : "")
}



/*La funzione legge il file contenuto al percorso passato per argomento e memorizza il suo contenuto
sotto forma di stringa binaria base64. 

La funzione viene utilizzata per fare l'upload di un'immagine da parte di un client.

La funzione richiede come parametro un riferimento al file da leggere.

*/


async function read(file) {

    file.content = await new Promise((resolve, reject) => {

        //Istanzia un oggetto di tipo FileReader

        const reader = new FileReader()


        //Terminata l'esecuzione della funzione asincrona viene risolta la promessa

        reader.onload = res => resolve(res.target.result) 


        //Gestisce le eccezioni

        reader.onerror = err => reject(err)


        //Legge il file in maniera asincrona
        
        reader.readAsDataURL(file.files[0])
    })
}



/*La funzione visualizza un campo nascosto all'interno di un form, quando si seleziona
un opportuno radio button.*/


function showField(elem,id){

    const hidden_field = document.getElementById(id)

    if (elem.value=='Organizzatore eventi'){
        hidden_field.style.setProperty("display","block")
        hidden_field.disabled = false
    }
        
    else{
        hidden_field.style.setProperty("display","none")
        hidden_field.disabled = true
        hidden_field.value = ""
    }
}