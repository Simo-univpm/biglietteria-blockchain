// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Biglietteria {
    
    //strutture dati interne al contratto    
    struct Evento{
        uint id;
        uint totali;
        uint disponibili;
    }

    struct Biglietto{
        uint id;
        bool isUsed;
        address cliente;
    }
    

    // attributi
    Evento evento;
    mapping(address => uint) private richieste_biglietti; // hashmap -> Chiave: indirizzo wallet cliente. Valore: numero biglietti richiesti per cliente
    uint idBiglietto = 0;
    Biglietto[] bigliettiEmessi;

    address private biglietteria; // indirizzo della biglietteria, preso dal costruttore. E' il primo indirizzo che contatta il contratto.
    address private annullatore;  // indirizzo dell' annullatore, preso dal costruttore.



    // costruttore
    constructor(uint _postiTotali, uint _id, address _annullatore){

        evento.id = _id;
        evento.totali = _postiTotali;
        evento.disponibili = _postiTotali;
        biglietteria = msg.sender;
        annullatore = _annullatore;

    }


    // crea e aggiunge un nuovo biglietto all'elenco dei biglietti emessi
    function creaNuovoBiglietto(uint _id, bool _isUsed, address _cliente) private returns (bool){
        
        bigliettiEmessi.push(Biglietto(_id, _isUsed, _cliente)); // aggiunge un nuovo elemento all'array dei biglietti emessi

        return true;

    }

    // ritorna un biglietto tramite id
    function getBiglietto(uint _id) public view returns (uint, bool, address){

        // non si può ritornare lo struct perché solidity fa schifo, quindi ritorno i singoli campi
        return (bigliettiEmessi[_id].id, bigliettiEmessi[_id].isUsed, bigliettiEmessi[_id].cliente);

    }




    // gestisci biglietti ==================================================================================================================================================

    // Cliente
    function richiestaBiglietti(uint numero_biglietti) public returns (bool){

        address cliente = msg.sender;

        require(cliente != biglietteria);
        require(cliente != annullatore);
        require(numero_biglietti <= (evento.disponibili));
        require(richieste_biglietti[cliente]==0);    //!!!Controlla!!!! il numero di posti non viene decrementato

        richieste_biglietti[cliente] = numero_biglietti;
        return false;
    }

    function getRichieste(address cliente) public view returns (uint){
        return richieste_biglietti[cliente];
    }
    

    // Biglietteria
    function emettiBiglietti(address cliente) public{

        require(msg.sender == biglietteria);
        require(richieste_biglietti[cliente] > 0);

        evento.disponibili -= richieste_biglietti[cliente]; // decerementa il numero di biglietti disponibili dell'evento, sempre aggiornando la hashmap, posti disponibili - 5
        richieste_biglietti[cliente] = 0;                   // azzera il numero di biglietti richiesti dal cliente, in quanto la transazione è completata, richiesta di pino = 0

        creaNuovoBiglietto(idBiglietto, false, cliente);          // associo un biglietto valido al cliente che lo richiede.
        idBiglietto++;

        // INVIARE L'ID DEL BIGLIETTO (quindi il biglietto) AL SERVER
    }


    // Annullatore
    // da implementare con l'id del biglietto o con l'indirizzo del cliente ???
    function invalidaBiglietti(uint idBigliettoDaAnnullare) public returns (bool){

        require(msg.sender == annullatore);

        bigliettiEmessi[idBigliettoDaAnnullare].isUsed = true;        // invalida biglietto

        return true;
    }


}