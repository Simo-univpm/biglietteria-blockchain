/**
 * 
 * Questo è un middleware, possiamo aggiungerlo ad ogni route che vogliamo sia accedibile solo
 * con certi privilegi.
 * Queste routes non possono essere utilizzate se l'utente non è in possesso del token e dei privilegi necessari.
 * 
*/

async function checkPrivileges(req, res, privileges, next){

    /* Se l'utente ha i privilegi necessari per accedere alla rotta, l'accesso viene consentito.
    
    Più in particolare si controlla se i privilegi associati all'utente appartengono all'insieme
    dei privilegi necessari per accedere alla rotta. */

    if(privileges.includes(req.headers.user.privileges)) next()


    // Se l'utente è un annullatore viene reindirizzato alla pagina per annullare i biglietti

    else if (req.headers.user.privileges == "Annullatore") res.redirect("/tickets/annulla-biglietti")


    // Se l'utente non ha i privilegi necessari per accedere alla rotta viene reindirizzato alla home page

    else res.status(401).redirect("/eventi?type=Cinema")

}


module.exports = checkPrivileges;