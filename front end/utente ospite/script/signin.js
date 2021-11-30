
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, necessarie per iscriversi al sito web*/



/*Questa funzione controlla, al momento della registrazione al sito, se il campo contenente la
password corrisponde al campo contenente la conferma della password*/


function confermaPassword(conferma_password)
{   
    if (document.getElementById('Password').value!=conferma_password.value) //Confronta il valore dei due campi
        conferma_password.setCustomValidity("Le due password non coincidono")   //Se le password non coincidono viene stampato un opportuno messaggio d'errore
    else
        conferma_password.setCustomValidity("")
}


/*Questa funzione permette al client di creare un nuovo account e registrarsi al sito. La funzione prende
i valori dei campi contenuti nel form di registrazione e li invia al server tramite una richiesta HTTP di 
tipo POST. Se la registrazione ha successo il client viene reindirizzato alla pagina di login, altrimenti
viene stampato un opportuno messaggio d'errore*/


async function signin(){

    const status = await fetch("/api/users/register",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(getFormData())}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/login" //Se la registrazione ha successo, il client viene reindirizzato alla pagina di login
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}