
/*Questo modulo contiene tutte le funzioni javascript che verranno eseguite lato client*/



/*Questa funzione controlla, al momento della registrazione al sito, se il campo contenente la
password corrisponde al campo contenente la conferma della password*/


function confermaPassword(conferma_password)
{   
    if (document.getElementById('password').value!=conferma_password.value) //Confronta il valore dei due campi
        conferma_password.setCustomValidity("Le due password non coincidono")   //Se le password non coincidono viene stampato un opportuno messaggio d'errore
    else
        conferma_password.setCustomValidity("")
}



/*Questa funzione permette ad un client di accedere all'area riservata di ticketTwo, inserendo
le proprie credenziali di accesso. 
La funzione prende il nome utente e la password inseriti dall'utente e li invia al server tramite
una richiesta HTTP di tipo POST. Il client si metterà in attesa della risposta del server. La risposta
contiene un token, che permetterà all'utente di rimanere autenticato, mentre naviga sul sito web.
Il token viene salvato nei cookies. Viene, quindi, allegato ad ogni richiesta HTTP, che fa il client.
Se il client non viene autenticato dal server viene stampato un messaggio di errore.

!!!NOTA!!! Eliminando i cookies del browser il client non sarà più autenticato. Bisognerà rifare il login.*/


async function login(){

    let data = {email: document.getElementById("email").value, password: document.getElementById("password").value}   //Istanzia un oggetto contenente email e password inseriti dall'utente
    const response = await fetch("/api/users/login",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.json()}) //Richiesta post al server per inviare i dati di login
    
    if (Object.keys(response).length>0){
        document.cookie = "auth-token="+response.user.token+";path=/"   //Aggiunge il token ai cookies
        window.location.href = "/eventi?type=Cinema"    //Reindirizza alla pagina dell'area riservata
    }
    else
        document.getElementById("info").style.setProperty("display","block")    //Stampa un messaggio d'errore
    
}



/*Questa funzione permette al client di fare il logout dal proprio account. La funzione non fa altro che eliminare
i cookies relativi al sito (si imposta come data di scadenza del cookie una data passata) e reindirizzare il 
client alla pagina di login*/


async function logout(){

    document.cookie = "auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"   //Imposta la data di scadenza del cookie contenente il token
    window.location.href = "/login" //Reindirizza il client alla pagina del login
}



/*Questa funzione permette al client di aprire il menu a tendina presente nella navigation bar
del sito web. La funziona controlla se il menu è chiuso (attributo is_open con valore 0). Se il
menu è chiuso lo apre e imposta l'attributo is_open a 2.

!!!NOTA!!! La funzione viene richiamata quando il client clicca sul pulsante con l'icona dell'utente. 
(vedi implementazione della classe Bar)*/


function openMenu(menu){

    if (menu.getAttribute("is_open")==0)    //se il menu è chiuso (is_open==0)
    {
        menu.style.setProperty("display","block");  //apre il menu
        menu.setAttribute("is_open",2)  //Imposta is_open a 2
    }
    
}



/*Questa funzione permette al client di chiudere il menu a tendina presente nella navigation bar
del sito web. La funziona controlla se il menu è aperto (attributo is_open con valore 1 o 2). Se il
menu è aperto lo chiude e decrementa il valore dell'attributo is_open.

!!!NOTA!!! La funzione viene richiamata quando il client clicca su un qualunque punto della pagina (in
particolare sul body).*/


function closeMenu(menu){

    let is_open = menu.getAttribute("is_open")  //ottiene il valore dell'attributo is_open

    if (is_open==1) menu.style.setProperty("display","none");   //se il menu è aperto e is_open==1 il menu viene chiuso
    if (is_open>0) is_open -= 1;    //decrementa il valore di is_open
    menu.setAttribute("is_open",is_open)    //imposta il valore dell'attributo
}



/*Questa funzione permette al client di creare un nuovo account e registrarsi al sito. La funzione prende
i valori dei campi contenuti nel form di registrazione e li invia al server tramite una richiesta HTTP di 
tipo POST. Se la registrazione ha successo il client viene reindirizzato alla pagina di login, altrimenti
viene stampato un opportuno messaggio d'errore*/


async function signin(){

    const campi = ["name","surname","email","tel","dateOfBirth","gender","password"]    //Nome dei campi del form da inviare al server
    let data = {}   //Istanzia un oggetto vuoto

    for (let i=0; i<campi.length; i+=1)
        data[campi[i]] = document.getElementById(campi[i]).value    //Inserisce i valori dei campi selezionati in un oggetto

    const status = await fetch("/api/users/register",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/login" //Se la registrazione ha successo, il client viene reindirizzato alla pagina di login
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}



/*Questa funzione permette ad un client con privilegi da event manager di creare un nuovo evento. La funzione prende
i valori dei campi contenuti nel form dell'evento e li invia al server tramite una richiesta HTTP di 
tipo POST. Se la creazione dell'evento ha successo il client viene reindirizzato alla pagina precedente, altrimenti
viene stampato un opportuno messaggio d'errore*/


async function createEvent(){

    const campi = ["nome","luogo","data","orario","postiTotali","prezzo"]   //Nome dei campi del form da inviare al server
    let data = {}   //Istanzia un oggetto vuoto

    for (let i=0; i<campi.length; i+=1)
        data[campi[i]] = document.getElementById(campi[i]).value    //Inserisce i valori dei campi selezionati in un oggetto
       
    data.immagine = await readFile(document.getElementById("immagine").files[0])    //Legge l'immagine dal file system del client (l'immagine viene memorizzata come una stringa binaria base64)

    const status = await fetch("/api/events",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.history.back()   //Se la creazione dell'evento ha successo, il client viene reindirizzato alla pagina precedente
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}



/*La funzione legge il file contenuto al percorso passato per argomento e restituisce il suo contenuto
sotto forma di stringa binaria base64. La funzione viene utilizzata per fare l'upload di un'immagine da parte di un client.*/


function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();  //Istanzia un oggetto di tipo FileReader
  
      reader.onload = res => {
        resolve(res.target.result); //Terminata l'esecuzione della funzione asincrona viene risolta la promessa
      };
      reader.onerror = err => reject(err);  //Gestisce le eccezioni
  
      reader.readAsDataURL(file);   //Legge il file in maniera aincrona
    });
}



/*La funzione permette al client di acquistare un nuovo biglietto. La funzione fa una richiesta HTTP di tipo GET al 
server passando come parametri l'id dell'evento di cui il client vuole comprare i biglietti e il numero di biglietti.
Il server reindirizzerà poi il client alla pagina di paypal su cui potrà effettuare il pagamento.

!!!NOTA!!! La funzione controlla il metodo di pagamento scelto dall'utente, ma solo paypal è disponibile. Gli altri non
sono implementati.*/

async function buyTicket() {

    eventID = new URLSearchParams(window.location.search).get("id"),    //Legge il parametro (ID dell'evento) dalla query string
    numero_biglietti = document.getElementById("ticketNumber").value    //Ottiene il numero dei biglietti che vuole acquistare il client

    //Se il client seleziona un metodo di pagamento diverso da paypal, il sito avverte che il metodo di pagamento non è disponibile.

    if (document.getElementById("metodi_pagamento").value.replace("<img src=","").replace(".png width=60px></img>","")!="paypal")
        document.getElementById("info").style.setProperty("display","block")
    
    else
        window.location.href = "/api/pay?id="+eventID+"&numero_biglietti="+numero_biglietti //Effettua la richiesta GET al server
}

function showEventManagerField() {

    if (document.getElementById('privileges').value=='Event manager') 
        document.getElementById('event_manager_field').style.setProperty("display","block")
    else
        document.getElementById('event_manager_field').style.setProperty("display","none")
}