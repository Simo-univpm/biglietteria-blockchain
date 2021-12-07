
const path = require('path');
const fs = require('fs');
const solc = require('solc');


function compile() {

    const sorgente = fs.readFileSync(path.dirname(__filename)+"/ticketOffice.sol","utf8"); //sorgente del contratto

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

    const data=JSON.parse(solc.compile(JSON.stringify(input))); //contratto compilato
    const contract = {}
    contract.abi=data.contracts.file.Biglietteria.abi   //abi dello smart contract che implementa la biglietteria di ticketTwo
    contract.bytecode=data.contracts.file.Biglietteria.evm.bytecode.object  //bytecode dello smart contract che implementa la biglietteria di ticketTwo

    return contract
}

module.exports = compile;