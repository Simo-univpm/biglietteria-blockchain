/*La funzione checkPassword verifica se la password inserita ha almeno 8 caratteri e 
contiene almeno un carattere speciale ed una lettera maiuscola.

La funzione richiede come parametro la password da controllare.

La funzione non restituisce alcun valore.

*/

function checkPassword(password){

    if (password.length < 8) throw "La password inserita è troppo debole.\nInserire una password con almeno 8 caratteri"
    if (password.length > 64) throw "La password inserita è troppo lunga.\nLa masimma lunghezza supportata è di 64 caratteri"

    // Se la password non contiene alcuna lettera minuscola viene restituito false
    // (si controlla se la password convertita in minuscolo sia uguale alla password stessa)

    if (password == password.toLocaleLowerCase()) throw "La password inserita è troppo debole.\nInserire una password contenente almeno una lettera maiuscola"

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

    if (!flag) throw "La password inserita è troppo debole.\nInserire una password contenente almeno un carattere speciale"

}

module.exports = checkPassword