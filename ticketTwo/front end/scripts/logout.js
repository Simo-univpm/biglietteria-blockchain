
/*Questa funzione permette al client di fare il logout dal proprio account. La funzione non fa altro che eliminare
i cookies relativi al sito (si imposta come data di scadenza del cookie una data passata) e reindirizzare il 
client alla pagina di login.*/


async function logout(){

    // Imposta la data di scadenza del cookie contenente il token
    
    document.cookie = "auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/"   
    

    // Reindirizza il client alla pagina del login

    window.location.href = "/?type=Cinema" 
}