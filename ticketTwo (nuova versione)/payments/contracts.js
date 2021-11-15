
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3')

class SmartContract {

    //compila il contratto contenente lo smart contract per l'emissione dei biglietti

    constructor()
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
        console.log(this.abi)
        console.log(this.bytecode)
    }

    

    //deploy del contratto sulla blockchain
    async deploy(args)
    {
        //const args = [titolo_evento,luogo_evento,artisti_evento,posti_evento,data_evento,orario_evento] //argomenti del costruttore
        //const web3 = new Web3("http://127.0.0.1:22000")
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


module.exports = SmartContract;