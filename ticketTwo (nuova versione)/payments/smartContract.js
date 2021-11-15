
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3')
const web3 = new Web3("http://192.168.1.11:22000")

class SmartContract {

    //compila il contratto contenente lo smart contract per l'emissione dei biglietti

    constructor()
    {
        this.address = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"
        const sorgente = fs.readFileSync(path.dirname(__filename)+"/ticket.sol","utf8"); //cambiare percorso del contratto
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
    async deploy(titolo,luogo,artisti,posti,data,orario)
    {
        const args = [titolo,luogo,artisti,posti,data,orario] //argomenti del costruttore
        this.biglietto = await new web3.eth.Contract(this.abi).deploy({data:this.bytecode,arguments:args}).send({from: this.address})    
    }

    async call()
    {
        return this.biglietto.methods.verificaDispBiglietti(4).call()
    }


}


module.exports = SmartContract;