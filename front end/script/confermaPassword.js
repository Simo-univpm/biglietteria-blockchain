
/*Questo modulo contiene la funzione javascript, eseguita lato client, che controlla se la password inserita coincide con la conferma della password.*/



/*Questa funzione controlla, al momento della registrazione al sito, se il campo contenente la
password corrisponde al campo contenente la conferma della password*/


function confermaPassword(conferma_password)
{   
    if (document.getElementById('Password').value!=conferma_password.value) //Confronta il valore dei due campi
        conferma_password.setCustomValidity("Le due password non coincidono")   //Se le password non coincidono viene stampato un opportuno messaggio d'errore
    else
        conferma_password.setCustomValidity("")
}