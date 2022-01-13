const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lockWallet = require('./wallet').lockWallet
const unlockWallet = require('./wallet').unlockWallet

const SmartContract = require('web3-eth-contract')
SmartContract.setProvider(process.env.RPC_URL)


/* Questa funzione compila il sorgente dello smart contract che esegue le operazioni di emissione ed
invalidazione dei biglietti ("ticketOffice.sol").

La funzione non richiede nessun parametro.

Se la compilazione ha successo la funzione restituisce un oggetto contenente abi e bytecode dello smart contract.
Altrimenti restituisce undefined.

*/


function compile() {

    try{

        //Compila lo smart contract

        const data = JSON.parse(solc.compile(JSON.stringify({
        
            language: 'Solidity',
            sources: {
                file: {
                    content: fs.readFileSync(path.dirname(__filename)+"/ticketOffice.sol","utf8")
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': [ 'abi', 'evm.bytecode' ]
                    }
                }
            }
        })))

        //Restituisce abi e bytecode
    
        return {
            abi: data.contracts.file.TicketOffice.abi,
            bytecode: data.contracts.file.TicketOffice.evm.bytecode.object
        }

    } catch{
        return
    }
}



/* Questa funzione esegue il deploy di uno smart contract.

La funzione richiede come parametri:
    - l'indirizzo del wallet che invoca la transazione (msg.sender)
    - la password associata al wallet (necessaria per sbloccare l'account)
    - l'abi del contratto
    - il bytecode del contratto
    - gli argomenti del costruttore

Se il deploy ha successo la funzione restituisce l'indirizzo dello smart contract deployato sulla blockchain.
Altrimenti restituisce undefined.
*/


async function deploy(walletAddress,walletPassword,abi,bytecode,args){

    try{

        await unlockWallet(walletAddress,walletPassword)

        return (await new SmartContract(abi).deploy({data: bytecode, arguments: args}).send({from: walletAddress})).options.address

    } catch{return} finally{
        await lockWallet(walletAddress)
    }
}



/* Questa funzione esegue una generica transazione sulla blockchain.

La funzione richiede come parametri:
    - l'indirizzo del wallet che invoca la transazione (msg.sender)
    - la password associata al wallet (necessaria per sbloccare l'account)
    - l'indirizzo del contratto sulla blockchain
    - l'abi del contratto
    - il nome del metodo da invocare
    - l'argomento da passare alla transazione (accetta solo 0 o un argomento)

Se la transazione ha successo la funzione restituisce i dati relativi alla transazione effettuata (hash, eventi, ...).
Altrimenti restituisce undefined.
*/


async function eseguiTransazione(walletAddress,walletPassword,contractAddress,abi,method,arg){

    try{

        const contract = await new SmartContract(abi,contractAddress)

        await unlockWallet(walletAddress,walletPassword)

        return (arg == undefined) ? await contract.methods[method]().send({from: walletAddress}) : await contract.methods[method](arg).send({from: walletAddress})

    } catch{return} finally{

        await lockWallet(walletAddress)
    }
}


module.exports.compile = compile;
module.exports.deploy = deploy;
module.exports.eseguiTransazione = eseguiTransazione;