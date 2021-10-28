
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3')

class Contract {

    constructor()
    {
        //const URL = "http://127.0.0.1:22000" //rpcURL, si legge su cakeshop
        const titolo_evento="evento"
        const luogo_evento="luogo"
        const data_evento=[21,10,2021]
        const orario_evento=[20,0,0]
        const artisti_evento="artista"
        const posti_evento=1000
        //const args = [titolo_evento,luogo_evento,artisti_evento,posti_evento,data_evento,orario_evento] //argomenti del costruttore
        //const address = "0x0ae70357dd068d904b499a58e75473eb9e8baf5f"	//indirizzo dell'account (si legge su cakeshop)
        this.compila()
    }

    //compila il sorgente passato per parametro e restituisce abi e bytecode
    async compila()
    {
        const sorgente = fs.readFileSync(path.dirname(__filename)+"/contracts/biglietto.sol","utf8"); //cambiare percorso del contratto
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
        this.abi=data.contracts.file.Biglietteria.abi
        this.bytecode=data.contracts.file.Biglietteria.evm.bytecode.object
    }

    //deploy del contratto sulla blockchain
    async deploy(args)
    {
        //const web3 = new Web3(URL)
        this.compila()
        //let contract = new web3.eth.Contract(abi).deploy({data:bytecode,arguments:args})
        //contract=await contract.send({from:address});
        //return contract
    }

    async call(nome_metodo)
    {
        await eval("contract.methods."+metodo+".call().then(console.log)");
    }


}


module.exports = Contract;