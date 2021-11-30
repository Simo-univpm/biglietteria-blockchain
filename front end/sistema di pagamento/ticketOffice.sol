// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Biglietteria {
    
    //strutture
    
    struct Ora{
        uint8 ora;
        uint8 minuti;
    }
    
    struct Data{
        uint8 giorno;
        uint8 mese;
        uint16 anno;
    }
    
    struct Posti{
        uint totali;
        uint disponibili;
    }
    
    struct Evento{
        string titolo;
        string luogo;
        string artisti;
        Ora orario;
        Data data;
        Posti posti;
    }
    
    // attributi
    
    Evento private evento;
    uint private biglietti_bloccati = 0;
    uint8[12] private giorni_per_mese = [31,28,31,30,31,30,31,31,30,31,30,31];
    mapping(address => uint) public richieste_biglietti;
    mapping(address => uint) public biglietti;
    event Emesso(address indexed cliente, uint numero_biglietti);
    
    // costruttore

    constructor(string memory _titoloEvento, string memory _luogo, string memory _artisti, uint _postiTotali, Data memory _data_evento, Ora memory _orario_evento){
        
        evento.titolo = _titoloEvento;
        evento.luogo = _luogo;
        evento.data = _data_evento;
        evento.orario = _orario_evento;
        evento.artisti = _artisti;
        evento.posti.totali = _postiTotali;
        evento.posti.disponibili = _postiTotali;
    }

    // getters =========================================================================================

    function getTitoloEvento() public view returns (string memory){
        return evento.titolo;
    }
    
    function getLuogoEvento() public view returns (string memory){
        return evento.luogo;
    }
    
    function getDataEvento() public view returns (Data memory){
        return evento.data;
    }
    
    function getOrarioEvento() public view returns (Ora memory){
        return evento.orario;
    }
    
    function getArtistiEvento() public view returns (string memory){
        return evento.artisti;
    }
    
    function getPostiEvento() public view returns (Posti memory){
        return evento.posti;
    }
    
    
    // gestisci biglietti
    
    function verificaDispBiglietti(uint numero_biglietti) public returns (bool){
        address cliente = msg.sender;
        require(numero_biglietti<=(evento.posti.disponibili-biglietti_bloccati));
        biglietti_bloccati += numero_biglietti;
        richieste_biglietti[cliente] = numero_biglietti;
        return true;
    }
    
    function sbloccaBiglietti() public returns (bool){
        address cliente = msg.sender;
        require(richieste_biglietti[cliente]>0);
        biglietti_bloccati -= richieste_biglietti[cliente];
        richieste_biglietti[cliente] = 0;
        return true;
    }
    
    function emettiBiglietti() public returns (bool){
        //controllare la ricevuta!!
        address cliente = msg.sender;
        require(richieste_biglietti[cliente]>0);
        biglietti[cliente] += richieste_biglietti[cliente];
        evento.posti.disponibili -= richieste_biglietti[cliente];
        emit Emesso(cliente,richieste_biglietti[cliente]);
        richieste_biglietti[cliente] = 0;
        return true;
    }
   
}