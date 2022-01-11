// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract TicketOffice {
    
    //strutture dati interne al contratto    
    struct Evento{
        uint id;
        uint totali;
        uint disponibili;
        bool venditeAperte;
    }

    struct Biglietto{
        uint id;
        bool isUsed;
        address cliente;
    }

    event EmissioneTerminata(address cliente, uint idBiglietto);
    

    // attributi
    Evento private evento;
    mapping(address => uint) public richieste_biglietti; // hashmap -> Chiave: indirizzo wallet cliente. Valore: numero biglietti richiesti per cliente
    uint private idBiglietto = 0;
    Biglietto[] private bigliettiEmessi;

    address private operatore_biglietteria; // indirizzo della biglietteria, preso dal costruttore. E' il primo indirizzo che contatta il contratto.
    address private annullatore;  // indirizzo dell' annullatore, preso dal costruttore.
    address private biglietteria_automatica;



    // costruttore
    constructor(uint _postiTotali, uint _id, address _annullatore, address _biglietteria_automatica){

        evento.id = _id;
        evento.totali = _postiTotali;
        evento.disponibili = _postiTotali;
        evento.venditeAperte = true;
        operatore_biglietteria = msg.sender;
        annullatore = _annullatore;
        biglietteria_automatica = _biglietteria_automatica;
        
    }


    // crea e aggiunge un nuovo biglietto all'elenco dei biglietti emessi
    function creaNuovoBiglietto(uint _id, address _cliente) private returns (bool){
        
        bigliettiEmessi.push(Biglietto(_id, false, _cliente)); // aggiunge un nuovo elemento all'array dei biglietti emessi

        return true;

    }

    // ritorna un biglietto tramite id
    function getBiglietto(uint _id) public view returns (uint, bool, address){

        // non si può ritornare lo struct quindi ritorno i singoli campi
        return (bigliettiEmessi[_id].id, bigliettiEmessi[_id].isUsed, bigliettiEmessi[_id].cliente);

    }


    function getBigliettiRimasti() public view returns (uint){

        return evento.disponibili;
    }


    function getStatoVendite() public view returns (bool){

        return evento.venditeAperte;
    }




    // gestisci biglietti ==================================================================================================================================================

    // Cliente
    function richiestaBiglietti(uint numero_biglietti) public{

        address cliente = msg.sender;

        require(cliente != operatore_biglietteria);
        require(cliente != biglietteria_automatica);
        require(cliente != annullatore);
        require(evento.venditeAperte == true);
        require(richieste_biglietti[cliente] == 0);
        require(numero_biglietti <= evento.disponibili);

        richieste_biglietti[cliente] = numero_biglietti;
        evento.disponibili -= numero_biglietti;
    }

    function annullaRichiestaBiglietti(address cliente) public{

        require(msg.sender == operatore_biglietteria);

        evento.disponibili += richieste_biglietti[cliente];
        richieste_biglietti[cliente] = 0;
    }
    

    // Biglietteria
    function emettiBiglietti(address cliente) public{

        require(msg.sender == biglietteria_automatica);
        require(evento.venditeAperte == true);
        require(richieste_biglietti[cliente] > 0);

        richieste_biglietti[cliente] -= 1;                 // emette un biglietto per il cliente che lo richiede.

        creaNuovoBiglietto(idBiglietto, cliente);          // associo un biglietto valido al cliente che lo richiede e lo salva nell'array dei biglietti emessi

        emit EmissioneTerminata(cliente,idBiglietto);
        idBiglietto++;

    }


    // Annullatore
    function invalidaBiglietti(uint idBigliettoDaAnnullare) public{

        require(msg.sender == annullatore);
        require(bigliettiEmessi[idBigliettoDaAnnullare].isUsed == false);
        require(evento.venditeAperte == false);

        bigliettiEmessi[idBigliettoDaAnnullare].isUsed = true;        // invalida biglietto
    }


    function chiudiVendite() public{

        require(msg.sender == operatore_biglietteria);
        require(evento.venditeAperte == true);

        evento.venditeAperte = false;
    }


}