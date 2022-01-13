const QRCode = require('qrcode');
const crypto = require('crypto');



/* Questa funzione esegue l'apposizione del sigillo su un biglietto emesso dall'applicazione web.
L'apposizione del sigillo consiste nel calcolare l'hash del biglietto (SHA256) e firmare l'hash
con la chiave privata del server (RSA).

Il calcolo dell'hash garantisce integrità del biglietto (biglietto non corrotto).
La firma digitale garantice autenticità del biglietto (Biglietto emesso dal nostro server).

Prima di calcolare l'hash il biglietto (JSON) è trasformato in una stringa.

La funzione richiede come parametro il biglietto (oggetto) su cui apporre il sigillo.

La funzione non restituisce alcun valore.

*/


function apposizioneSigillo(ticket){
    
    ticket.sigillo_fiscale = crypto.sign("SHA256", JSON.stringify(ticket), process.env.RSA_PRIVATE_KEY).toString("hex")
}



/* Questa funzione genera un codice QRcode a partire dai dati del biglietto e lo aggiunge
ai campi del biglietto.

L'utilizzo di un QRcode facilita la memorizzazione del biglietto per il cliente e permette di
automatizzare l'operazione di invalidazione. 

La funzione richiede come parametro il biglietto (oggetto) di cui generare il QRcode.

La funzione non restituisce alcun valore.

*/

async function generazioneQRcode(ticket){
    
    ticket.qrcode = await QRCode.toDataURL(JSON.stringify(ticket))
}



/* Questa funzione genera il codice identificativo da associare al biglietto.

Al termine dell'emissione del biglietto sulla blockchain, viene lanciato un evento
chiamato "EmissioneTerminata". All'interno di questo evento sono contenuti:
    - l'indirizzo del wallet che ha acquistato il biglietto,
    - l'id del biglietto emesso (è necessario per individuare il biglietto sulla blockchain)

La funzione recupera l'id del biglietto all'interno dell'evento "EmissioneTerminata" e lo aggiunge
ai campi del biglietto.

Questo id è diverso dal ticketID. Viene generato dallo smart contract.

La funzione richiede come parametri:
    - il biglietto emesso,
    - la transazione (oggetto) in cui è avvenuta l'emissione del biglietto.

La funzione non restituisce alcun valore.

*/


function generazioneCodiceIdentificativo(ticket,transazione){

    ticket.Codice_identificativo = transazione.events.EmissioneTerminata.returnValues.idBiglietto
}



/* Questa funzione verifica l'integrità e l'autenticità di un biglietto, controllando
se il sigillo fiscale è valido.

Il sigillo fiscale è una firma dell'hash del biglietto memorizzata come stringa esadecimale.
Il sigillo viene convertito in un oggetto di tipo buffer per poi verificarne la validità
attraverso i seguenti passi:
    - rimozione dei campi "sigillo_fiscale" e "qrcode"
    - conversione del biglietto (JSON) in una stringa
    - calcolo dell'hash del biglietto (SHA256)
    - "decifratura" del sigillo fiscale tramite la chiave pubblica del server (RSA)
    - confronto tra i due hash

Risulta necessario rimuovere dal biglietto i campi "sigillo_fiscale" e "qrcode", poichè
al momento del calcolo dell'hash questi non erano ancora presenti. (Se si lasciano la 
verifica fallisce).

La funzione richiede come parametro il biglietto (oggetto) di cui bisogna verificare la validità del sigillo.

La funzione restituisce true se il sigillo è autentico, false altrimenti.

*/


function verificaSigillo(ticket){

    const sigillo_fiscale = Buffer.from(ticket.sigillo_fiscale,"hex")
    return crypto.verify("SHA256", JSON.stringify({... ticket, sigillo_fiscale : undefined, qrcode : undefined}), process.env.RSA_PUBLIC_KEY, sigillo_fiscale)
}



module.exports.apposizioneSigillo = apposizioneSigillo;
module.exports.generazioneQRcode = generazioneQRcode;
module.exports.generazioneCodiceIdentificativo = generazioneCodiceIdentificativo;
module.exports.verificaSigillo = verificaSigillo;