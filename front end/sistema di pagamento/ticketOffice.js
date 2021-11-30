
const path = require('path');
const fs = require('fs');
//const solc = require('solc');   //Compilatore solidity
const Web3 = require('web3');   //Api per la blockchain
const web3 = new Web3("http://prova:8080");  //URL del nodo quorum (si legge su cakeshop). Da macchina virtuale inseririre l'ip della macchina virtuale più la porta del nodo)

/*La classe TicketOffice implementa la biglietteria automatica di ticketTwo. */

class TicketOffice {

    /*Il costruttore compila il sorgente dello smart contract che andrà a svolgere il ruolo della biglietteria
    e ottiene abi e bytecode del contratto. */

    constructor() {

        this.address = "0xed9d02e382b34818e88b88a309c7fe71e65f419d" //indirizzo della biglietteria su blockchain (scelto a caso)
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

        //const data=JSON.parse(solc.compile(JSON.stringify(input))); //contratto compilato
        //this.abi=data.contracts.file.Biglietteria.abi   //abi dello smart contract che implementa la biglietteria di ticketTwo
        //this.bytecode=data.contracts.file.Biglietteria.evm.bytecode.object  //bytecode dello smart contract che implementa la biglietteria di ticketTwo
    }


}



module.exports = TicketOffice;