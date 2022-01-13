/*La funzione getToken controlla se all'interno della richiesta HTTP inviata da un client
è presente un token di autenticazione. 

La funzione richiede come parametri:
    - la richiesta HTTP inviata dal client,
    - il tipo di token di autenticazione (login o OTP)

La funzione cerca il token all'interno dei cookies allegati alla richiesta. 

Se il token viene trovato, la funzione restituisce il token.
Altrimenti restituisce undefined.

*/


function getToken(req,token_type){

    // Cerca il token di autenticazione all'interno dei cookies inviati insieme alla richiesta HTTP

    const token = req.headers.cookie ? req.headers.cookie.split("; ").map(cookie => cookie.split("=")).find(cookie => cookie[0]==token_type) : undefined
    return token ? token[1] : undefined
}


module.exports = getToken;