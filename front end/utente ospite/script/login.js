
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, necessarie per il login*/


/*Questa funzione permette ad un client di accedere all'area riservata di ticketTwo, inserendo
le proprie credenziali di accesso. 
La funzione prende il nome utente e la password inseriti dall'utente e li invia al server tramite
una richiesta HTTP di tipo POST. Il client si metterà in attesa della risposta del server. La risposta
contiene un token, che permetterà all'utente di rimanere autenticato, mentre naviga sul sito web.
Il token viene salvato nei cookies. Viene, quindi, allegato ad ogni richiesta HTTP, che fa il client.
Se il client non viene autenticato dal server viene stampato un messaggio di errore.

!!!NOTA!!! Eliminando i cookies del browser il client non sarà più autenticato. Bisognerà rifare il login.*/


async function login(redirect_url){

    const response = await fetch("/api/users/login",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(getFormData())}).then((res)=>{return res.json()}) //Richiesta post al server per inviare i dati di login
    
    if (Object.keys(response).length>0){
        document.cookie = "auth-token="+response.user.token+";path=/"   //Aggiunge il token ai cookies
        window.location.href = redirect_url    //Reindirizza alla pagina dell'area riservata
    }
    else
        document.getElementById("info").style.setProperty("display","block")    //Stampa un messaggio d'errore
    
}