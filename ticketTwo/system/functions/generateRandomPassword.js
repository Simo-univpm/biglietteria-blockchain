/*La funzione generateRandomPassword genera un numero casuale di n cifre, che può essere utilizzata
come codice OTP, come password di un wallet o come password temporanea di un account.

La funzione richiede come parametro la lunghezza della password.

La funzione restituisce una stringa contenente la password.

*/

function generateRandomPassword(length){
    
    const digits = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++ ) {
        password += digits[Math.floor(Math.random() * 10)];
    }

    return password.toString()
}

module.exports.generateRandomPassword = generateRandomPassword;