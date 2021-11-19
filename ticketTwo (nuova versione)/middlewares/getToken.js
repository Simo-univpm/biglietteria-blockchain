
/*La funzione getToken controlla se all'interno della richiesta HTTP inviata da un client
è presente il token di autenticazione. */

function getToken(req){

    let token;  //Crea una variabile vuota

    // Cerca il token di autenticazione all'interno dei cookies inviati insieme alla richiesta HTTP

    if (req.headers.cookie!=undefined){
        
        const cookies = req.headers.cookie.split("; ")  //Ottiene una lista di tutti i cookies associati alla richiesta

        for(let i=0; i<cookies.length; i+=1){
            const cookie = cookies[i].split("=")    //Separa il nome del cookie dal valore
            if (cookie[0]=="auth-token")    //Se il cookie considerato è quello che contiene il token di autenticazione
                token = cookie[1]   //memorizza il token
        }
    }
    
    return token    //Restituisce il token se lo trova, altrimenti restituisce undefined

}


module.exports = getToken;