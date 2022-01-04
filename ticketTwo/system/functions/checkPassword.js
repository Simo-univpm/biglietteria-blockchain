/*La funzione checkPassword verifica se la password inserita ha almeno 8 caratteri e 
contiene almeno un carattere speciale ed una lettera maiuscola.

La funzione richiede come parametro la password da controllare.

La funzione restituisce true se la password è valida, false altrimenti.

*/

function checkPassword(password){

    if (password.lenght < 8) return false

    // Se la password non contiene alcuna lettera minuscola viene restituito false
    // (si controlla se la password convertita in minuscolo sia uguale alla password stessa)

    if (password == password.toLocaleLowerCase()) return false

    // Lista di tutti i caratteri speciali

    const caratteriSpeciali = "<([{\^-=$!|]})?*+.>"

    let i = 0, j = 0, flag = false

    // Confronta ogni carattere della password con ciascun carattere speciale

    while (i<password.length && !flag){

        j=0

        while (j<caratteriSpeciali.length && !flag){

            // Se l'i-esimo carattere è speciale il flag viene impostato a true

            if (password[i] == caratteriSpeciali[j]) flag = true

            j += 1
        }

        i += 1
    }

    return flag

}

module.exports = checkPassword