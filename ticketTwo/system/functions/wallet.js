const Web3 = require('web3-eth-personal')
const web3 = new Web3(process.env.RPC_URL)
const generateRandomPassword = require('./generateRandomPassword').generateRandomPassword


/* Questa funzione crea un nuovo wallet sulla blockchain, associandogli una password casuale.

La funzione non richiede nessun parametro.

Se la creazione del wallet ha successo la funzione restituisce un oggetto contenente indirizzo e password del wallet.
Altrimenti restituisce undefined.

*/


async function createWallet(){
    
    try {

        const walletPassword = generateRandomPassword(6)
        const walletAddress = await web3.newAccount(walletPassword)
        return {
            address: walletAddress,
            password: walletPassword
        }
        
    }catch{
        return
    }
}


/* Questa funzione blocca il wallet associato all'indirizzo passato per parametro (un wallet bloccato non può effettuare transazioni).

La funzione richiede come parametro l'indirizzo del wallet da bloccare.

La funzione restituisce una promessa.

*/


async function lockWallet(walletAddress){
    
    await web3.lockAccount(walletAddress)
}



/* Questa funzione sblocca il wallet associato all'indirizzo passato per parametro (un wallet bloccato non può effettuare transazioni).

La funzione richiede come parametri:
    - l'indirizzo del wallet da sbloccare
    - la password necessaria per sbloccare il wallet

La funzione restituisce una promessa.

*/


async function unlockWallet(walletAddress,walletPassword){
    
    await web3.unlockAccount(walletAddress,walletPassword)
}


/* Questa funzione controlla se l'indirizzo del wallet passato per parametro è presente sul provider web3 a cui il
sito web è connesso.

La funzione richiede come parametro l'indirizzo del wallet che si vuole controllare.

Restituisce true se il wallet è presente sulla blockchain, false altrimenti.

*/


async function isAccount(walletAddress){

    const wallets = await web3.getAccounts()
    return  wallets.includes(walletAddress)
}

module.exports.createWallet = createWallet;
module.exports.lockWallet = lockWallet;
module.exports.unlockWallet = unlockWallet;
module.exports.isAccount = isAccount;