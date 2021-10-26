
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3')

class BlockchainApi {

    constructor(nome_file)
    {
        console.log(path.dirname(__filename)+"/contracts/"+nome_file+".sol")
        //console.log(compila(nome_file))
        /*const prompt = require('prompt-sync')();
        const URL = "http://127.0.0.1:22000" //rpcURL, si legge su cakeshop
        const nome_file = "biglietto"  //cambiare nome file
        const titolo_evento="evento"
        const luogo_evento="luogo"
        const data_evento=[21,10,2021]
        const orario_evento=[20,0,0]
        const artisti_evento="artista"
        const posti_evento=1000
        const args = [titolo_evento,luogo_evento,artisti_evento,posti_evento,data_evento,orario_evento] //argomenti del costruttore
        const address = "0x0ae70357dd068d904b499a58e75473eb9e8baf5f"	//indirizzo dell'account (si legge su cakeshop)
        deploy(nome_file,args,address,URL)*/
    }

    //compila il sorgente passato per parametro e restituisce abi e bytecode
    async compila(nome_file)
    {
        const sorgente = fs.readFileSync(path.dirname(__filename)+"/contracts/"+nome_file+".sol","utf8"); //cambiare percorso del contratto
        const input = {
            language: 'Solidity',
            sources: {
                file: {
                content: sorgente
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': [ 'abi', 'evm.bytecode' ]
                    }
                }
            }
        };
        const data=JSON.parse(solc.compile(JSON.stringify(input)));
        const abi=data.contracts.file.Biglietteria.abi
        const bytecode=data.contracts.file.Biglietteria.evm.bytecode.object
        return [abi,bytecode]
    }

    //deploy del contratto sulla blockchain
    async deploy(nome_file,args,address,URL)
    {
        const web3 = new Web3(URL)
        const [abi,bytecode] = compila(nome_file)
        let contract = new web3.eth.Contract(abi).deploy({data:bytecode,arguments:args})
        contract=await contract.send({from:address});
        return contract
    }

}


module.exports = BlockchainApi;