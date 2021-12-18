const Event = require('../model').Event;
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');

//Funzioni per interagire con la blockchain

const createWallet = require('../functions/wallet').createWallet
const compile = require('../functions/contract').compile
const deploy = require('../functions/contract').deploy
const eseguiTransazione = require('../functions/contract').eseguiTransazione

//Funzioni per interrogare il database

const create = require('../functions/query').create
const deleteOne = require('../functions/query').deleteOne
const find = require('../functions/query').find
const findOne = require('../functions/query').findOne
const update = require('../functions/query').update


class EventController {

    constructor(){}


    /*Questa funzione restituisce l'evento associato all'id passato per parametro.

    La funzione richiede come parametri:
        - l'id dell'evento da cercare,
        - i privilegi dell'utente che richiede la risorsa.

    La funzione restituisce un JSON contenente i dati dell'evento*/


    async getEvent(id,privileges){

        //Query per cercare gli eventi in base all'id

        const query = {eventID: id};


        /*Se l'utente che richiede la risorsa ha i privilegi da cliente,
        l'evento viene restituito solo se le vendite dei biglietti sono aperte*/

        if (privileges == "Cliente") query.stato = 1


        /*Se l'utente che richiede la risorsa ha i privilegi da event manager,
        l'evento viene restituito solo se le vendite dei biglietti non sono ancora aperte*/

        else if (privileges == "Organizzatore eventi") query.stato = 0


        //Esegue la query sul database

        return findOne(Event,query)
    }


    
    /*Questa funzione restituisce una lista contenente tutti gli eventi di una certa categoria.

    La funzione richiede come parametri:
        - il tipo dell'evento,
        - i privilegi dell'utente che richiede le risorse.

    La funzione restituisce una lista di JSON contenenti i dati dell'evento*/


    async getEventByType(type,user){

        //Query per cercare gli eventi in base al tipo

        const query = {type: type};


        /*Se l'utente che richiede la risorsa ha i privilegi da cliente, vengono
        restituiti solamente gli eventi per cui le vendite dei biglietti sono aperte*/

        if (!user || user.privileges == "Cliente") query.stato = 1


        /*Se l'utente che richiede la risorsa ha i privilegi da event manager ,vengono
        restituiti solamente gli eventi che appartengono alla sua organizzazione*/

        else if (user.privileges == "Organizzatore eventi") query.Organizzatore = user.Organizzatore


        //Esegue la query sul database

        return find(Event,query)
    }



    /*Questa funzione crea un nuovo evento nel database (avviene offchain).

    Lo smart contract non viene ancora istanziato in questa fase.

    La funzione richiede come parametri:
        - i dati dell'evento da creare,
        - il nome dell'organizzazione che gestisce l'evento.

    La funzione restituisce lo stato della richiesta*/


    async createEvent(eventData,organizzatore){

        // CREAZIONE NUOVO EVENTO:
        
        return create(Event,{

            type: eventData.type,
            Icona_evento: eventData.Icona_evento,
            Nome: eventData.Nome,
            Luogo: eventData.Luogo,
            Artisti: eventData.Artisti,
            Data_evento: eventData.Data_evento,
            Posti_totali: eventData.Posti_totali,
            Posti_disponibili: eventData.Posti_totali,
            Orario: eventData.Orario,
            Organizzatore: organizzatore,
            Prezzo: eventData.Prezzo,

            eventCreationDate: getCurrentDate(),
            eventCreationTime: getCurrentTime()

        }) 
    }



    /*Questa funzione aggiorna i dati relativi ad un evento nel database (avviene offchain).

    Lo smart contract non viene ancora istanziato in questa fase.

    Possibile solo se le vendite dei biglietti non sono ancora aperte.

    La funzione richiede come parametri:
        - i dati dell'evento da aggiornare,
        - l'id dell'evento da aggiornare.

    La funzione restituisce lo stato della richiesta*/


    async updateEvent(eventData,eventID){

        //Elimina un evento nel database
        //L'aggiornamento ha successo solo se lo stato dell'evento è impostato su 0 (vendite non ancora aperte)

        return update(Event,{eventID: eventID, stato:0},event => {

            //Se il tipo dell'evento è stato aggiornato, questo viene modificato

            if (eventData.type) event.type = eventData.type


            //I posti disponibili devono essere uguali ai posti totali (le vendite dei biglietti non sono ancora aperte)
            
            event.Posti_disponibili = eventData.Posti_totali


            //Aggiorna gli altri campi dell'evento

            new Array("Nome","Luogo","Artisti","Data_evento","Posti_totali","Orario","Prezzo").forEach(campo => event[campo] = eventData[campo])
        })
    }



    /*Questa funzione elimina i dati relativi ad un evento nel database (avviene offchain).

    Lo smart contract non viene ancora istanziato in questa fase.

    Possibile solo se le vendite dei biglietti non sono ancora aperte.

    La funzione richiede come parametro l'id dell'evento da eliminare.

    La funzione restituisce lo stato della richiesta*/


    async deleteEvent(id){

        //Elimina un evento dal database
        //L'eliminazione ha successo solo se lo stato dell'evento è impostato su 0 (vendite non ancora aperte)

        return deleteOne(Event,{eventID: id, stato:0})
    }



    /*Questa funzione apre le vendite dei biglietti per un dato evento.

    Istanzia lo smart contract sulla blockchain.

    I dati dell'evento non sono più modificabili.

    Possibile solo se le vendite dei biglietti non sono ancora aperte.

    La funzione richiede come parametri:
        - l'id dell'evento di cui si vogliono aprire le vendite,
        - l'indirizzo del wallet dell'annullatore dei biglietti per l'evento,
        - l'indirizzo del wallet dell'utente della biglietteria che istanzia lo smart contract,
        - la password del wallet dell'utente della biglietteria che istanzia lo smart contract.

    La funzione restituisce lo stato della richiesta*/


    async apriVendite(eventID,annullatore,manager_wallet,manager_password){

        return await update(Event,{eventID: eventID, stato:0},async event => {

            //Compila lo smart contract che si occupa dell'emissione e dell'invalidazione dei biglietti

            const contract = compile()
            if(! contract) throw "Impossibile compilare lo smart contract"


            //Crea un nuovo wallet che verrà associato all'evento
            //Chi possiede le credenziali di questo wallet può emettere i biglietti per questo evento

            const walletBiglietteriaAutomatica = await createWallet()
            if(! walletBiglietteriaAutomatica) throw "Impossibile creare il wallet della biglietteria automatica"


            //Argomenti del costruttore dello smart contract

            const args = [event.Posti_totali,event.eventID,annullatore,walletBiglietteriaAutomatica.address]


            //Esegue il deploy dello smart contract sulla blockchain

            const contractAddress = await deploy(manager_wallet,manager_password,contract.abi,contract.bytecode,args)
            if(! contractAddress) throw "Impossibile fare il deploy dello smart contract"

            console.log(contractAddress)

            //Imposta ad 1 lo stato dell'evento (vendite aperte)
            //I biglietti diventano disponibili per la vendita

            event.stato = 1;


            //Memorizza l'indirizzo dello smart contract nel database

            event.Indirizzo_contratto = contractAddress


            //Memorizza l'abi dello smart contract nel database

            event.ContractAbi = JSON.stringify(contract.abi)


            //Memorizza l'indirizzo del wallet abilitato all'emissione dei biglietti nel database

            event.WalletAutomaticTicketOffice = walletBiglietteriaAutomatica.address


            //Memorizza la password del wallet abilitato all'emissione dei biglietti nel database

            event.PasswordAutomaticTicketOffice = walletBiglietteriaAutomatica.password
            
        })
    }



    /*Questa funzione chiude le vendite dei biglietti per un dato evento.

    Aggiorna lo smart contract.

    Possibile solo se le vendite dei biglietti sono aperte.

    La funzione richiede come parametri:
        - l'id dell'evento di cui si vogliono chiudere le vendite,
        - l'indirizzo del wallet dell'utente della biglietteria che esegue la transazione,
        - la password del wallet dell'utente della biglietteria che esegue la transazione.

    La funzione restituisce lo stato della richiesta*/
    

    async chiudiVendite(eventID,manager_wallet,manager_password){

        return update(Event,{eventID: eventID, stato:1},async event => {

            //Esegue una transazione verso lo smart contract per chiudere le vendite dei biglietti
            //Le successive emissioni di biglietti falliranno

            const transazione = await eseguiTransazione(manager_wallet,manager_password,event.Indirizzo_contratto,JSON.parse(event.ContractAbi),"chiudiVendite")
            if (!transazione) throw "Impossibile chiudere le vendite"


            //Imposta ad 2 lo stato dell'evento (vendite chiuse)
            //I biglietti non sono più disponibili per la vendita
            //Gli annullatori sono abilitati ad eseguire l'invalidazione dei biglietti

            event.stato = 2;
        })
    }
}


module.exports = EventController;