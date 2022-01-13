const Ticket = require('../model').Ticket;
const Event = require('../model').Event;
const User = require('../model').User;

const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');

// Funzioni per interrogare il database

const create = require('../functions/query').create
const find = require('../functions/query').find
const findOne = require('../functions/query').findOne
const update = require('../functions/query').update

// Api per comunicare con il sistema di pagamento esterno (paypal)

const richiestaPagamento = require('../functions/paypal').richiestaPagamento
const eseguiPagamento = require('../functions/paypal').eseguiPagamento

// Funzioni per generare i biglietti

const apposizioneSigillo = require('../functions/ticket').apposizioneSigillo
const generazioneQRcode = require('../functions/ticket').generazioneQRcode
const generazioneCodiceIdentificativo = require('../functions/ticket').generazioneCodiceIdentificativo
const verificaSigillo = require('../functions/ticket').verificaSigillo

// Funzione per interagire con la blockchain

const eseguiTransazione = require('../functions/contract').eseguiTransazione

// Controller delle ricevute

const ReceiptController = require('./ReceiptController');
const receiptController = new ReceiptController();



class TicketController {

    constructor(){}



    /*Questa funzione restituisce i dati relativi ad un biglietto.

    La funzione richiede come parametri:
        - l'id dell'utente che possiede il biglietto,
        - l'id del biglietto che si vuole cercare.

    La funzione restituisce lo stato della richiesta*/


    async getTicket(userID,ticketID){

        // Cerca il biglietto nel database

        const ticketResult = await findOne(Ticket,{ticketID: ticketID})
        if (ticketResult[0] != 200) return ticketResult


        // Se l'utente specificato non è il possessore del biglietto la richiesta fallisce

        if (ticketResult[1].userID!=userID) return [401,'Questo biglietto è associato ad un altro utente']


        // Ottiene i dati dell'evento associato al biglietto

        const eventResult = await findOne(Event,{eventID: ticketResult[1].eventID})
        if (eventResult[0] != 200) return eventResult


        // Ottiene i dati dell'utente che possiede il biglietto

        const userResult = await findOne(User,{userID: userID})
        if (userResult[0] != 200) return userResult

        // Inserisce i dati dell'evento e dell'utente dentro al biglietto

        return [200, {"Nome evento": eventResult[1].Nome, ...ticketResult[1], ...eventResult[1], ...userResult[1]}]
    }



    /*Questa funzione restituisce una lista di tutti i biglietti posseduti da un utente.

    La funzione richiede come parametro l'id dell'utente di cui cercare i biglietti.

    La funzione restituisce lo stato della richiesta*/


    async getTicketsByUser(id){

        // Cerca tutti i biglietti posseduti da un utente nel database

        const result = await find(Ticket,{userID: id})
        if (result[0] != 200) return result

        // Filtra i biglietti escludendo quelli invalidati

        let tickets = result[1].filter(ticket => !ticket.isUsed)


        // Inserisce i dati dell'evento dentro al biglietto

        tickets = await Promise.all(tickets.map(async ticket => {
                
            const eventResult = await findOne(Event,{eventID: ticket.eventID})
            if (eventResult[0] != 200) return eventResult
            return {...ticket.toJSON(), ...eventResult[1]}
        }))


        // Restituisce il biglietto

        return [200,tickets]
        
    }



    /*Questa funzione restituisce una lista di tutti i biglietti emessi per un certo evento.

    La funzione richiede come parametro l'id dell'evento per cui si vogliono cercare i biglietti emessi.

    La funzione restituisce lo stato della richiesta*/


    async getTicketsByEvent(id){

        // Cerca tutti i biglietti relativi ad un certo evento

        return find(Ticket,{eventID: id})
    }



    /*Questa funzione restituisce una lista di tutti i biglietti invalidati per un certo evento.

    La funzione richiede come parametro l'id dell'evento per cui si vogliono cercare i biglietti invalidati.

    La funzione restituisce lo stato della richiesta*/


    async getInvalidatedTicketsByEvent(id){

        // Cerca tutti i biglietti invalidati relativi ad un certo evento

        const result = await find(Ticket,{eventID: id})


        // Filtra i biglietti emessi mantenendo solo quelli inalidati (ingressi)

        const tickets = result[1].filter(value => value.isUsed)


        // Restituisce i biglietti invalidati

        return [200, tickets]
        
    }



    /*Questa funzione permette ad un cliente di richiedere i biglietti per un certo evento.

    La funzione richiede come parametri:
        - il metodo di pagamento selezionato,
        - l'id dell'utente che richiede i biglietti,
        - l'id dell'evento per cui si richiedono i biglietti,
        - il numero di biglietti richiesti,
        - l'indirizzo del wallet del cliente che richiede i biglietti,
        - la password del wallet del cliente che richiede i biglietti.

    La funzione restituisce lo stato della richiesta*/


    async richiestaBiglietto(metodo_pagamento, userID, eventID, numeroBiglietti, wallet_cliente, password_cliente){

        // Controlla se l'utente ha scelto paypal come metodo di pagamento
        // Solo paypal è disponibile

        if (metodo_pagamento != "paypal") return [406, "Il metodo di pagamento selezionato non è disponibile"]


        // Controlla la validità del numero di biglietti inseriti

        if (numeroBiglietti < 1) return [500, "Inserire un numero di biglietti valido"]
        if (numeroBiglietti > 4) return [500, "Non è possibile acquistare più di 4 biglietti insieme"]


        // Cerca l'evento per cui l'utente vuole acquistare i biglietti nel database

        let link;

        const result = await findOne(Event,{eventID: eventID},async event => {

            // Esegue una transazione sullo smart contract per verificare la disponibilità dei biglietti

            const transazione = await eseguiTransazione(wallet_cliente, password_cliente, event.Indirizzo_contratto, JSON.parse(event.ContractAbi), "richiestaBiglietti", numeroBiglietti) 
            if (!transazione) throw "I biglietti non sono al momento disponibili"


            // Invia una richiesta di pagamento a paypal

            link = await richiestaPagamento(userID,event.eventID,event.Prezzo,numeroBiglietti)
            if (!link)  throw "Richiesta pagamento fallita"
            
        })

        if (result[0] != 200) return result

        // Restituisce il link al sito paypal per eseguire il pagamento

        return [200,link]
    }



    /*Questa funzione emette i biglietti richiesti da un cliente.

    La funzione richiede come parametri:
        - l'id dell'account paypal dell'utente che acquista i biglietti,
        - l'id del pagamento associato all'acquisto dei biglietti,
        - l'email dell'utente che acquista i biglietti,
        - l'id dell'account ticketTwo dell'utente che acquista i biglietti,
        - l'indirizzo del wallet del cliente che ha richiesto i biglietti.

    La funzione restituisce lo stato della richiesta*/


    async emissioneBiglietti(payerID, paymentID, email, userID, wallet_cliente){

        // Processa il pagamento dell'utente interfacciandosi con paypal
        // Terminato il pagamento vengono emessi i biglietti

        return await eseguiPagamento(payerID,paymentID).then(async paymentData => {


            // Controlla se l'utente che vuole i biglietti è lo stesso che ha effetuato il pagamento

            if (userID != paymentData.userID) return [401, "La ricevuta presentata è associata ad un altro utente"]


            // Ad ogni iterazione del ciclo viene generato un nuovo biglietto

            for (let i=0; i<paymentData.numero_biglietti; i+=1) {

                // CREAZIONE NUOVO BIGLIETTO:

                await create(Ticket,{

                    isUsed: false,
                    userID: userID,
                    eventID: paymentData.eventID,

                    Data_emissione: getCurrentDate(),
                    Orario_emissione: getCurrentTime()

                },async ticket => {

                    // Emissione del biglietto

                    await update(Event,{eventID: paymentData.eventID},async event => {

                        // Esegue una transazione sullo smart contract per emettere i biglietti

                        const transazione = await eseguiTransazione(event.WalletAutomaticTicketOffice, event.PasswordAutomaticTicketOffice, event.Indirizzo_contratto, JSON.parse(event.ContractAbi), "emettiBiglietti", wallet_cliente)
                        if (!transazione) throw "Emissione fallita"

                        // Recupera il codice identificativo generato dallo smrt contract
                        
                        generazioneCodiceIdentificativo(ticket,transazione)

                        // Apposizione sigillo fiscale (hash SHA256 + sign)

                        apposizioneSigillo(ticket)

                        // Generazione QR code

                        await generazioneQRcode(ticket)

                        // Decrementa il numero dei posti disponibili

                        event.Posti_disponibili -= 1
                    })
                })
            }

            // Emette la ricevuta associata al pagamento (una sola per tutti i biglietti)
            // Viene inviata per mail al cliente e salvata sul database

            return receiptController.emissioneRicevuta(paymentData.ricevuta,email)
        })
    }



    /*Questa funzione invalida il biglietto presentato dal cliente al momento dell'
    ingresso all'evento.

    La funzione richiede come parametri:
        - il biglietto ottenuto decodificando il QRcode presentato dal cliente,
        - l'indirizzo del wallet dell'annullatore dei biglietti,
        - la password del wallet dell'annullatore dei biglietti.

    La funzione restituisce lo stato della richiesta*/


    async invalidaBiglietto(ticket, wallet_annullatore, password_annullatore){

        // Esegue l'invalidazione del biglietto

        return update(Ticket,{_id: ticket._id},async ticketOnDB => {


            // Verifica autenticità e integrità del sigillo fiscale

            if (!verificaSigillo(ticket)) throw "Sigillo fiscale non autentico"


            // Cerca l'evento associato al biglietto

            const result = await findOne(Event,{eventID: ticket.eventID},async event => {

                // Invalidazione del biglietto sulla blockchain

                const transazione = await eseguiTransazione(wallet_annullatore, password_annullatore, event.Indirizzo_contratto, JSON.parse(event.ContractAbi), "invalidaBiglietti", ticket.Codice_identificativo)
                if (!transazione) throw "Invalidazione fallita"


                // Aggiunge al biglietto data e ora di invalidazione

                ticketOnDB.Data_invalidazione = getCurrentDate()
                ticketOnDB.Orario_invalidazione = getCurrentTime()


                // Imposta lo stato del biglietto ad usato (non viene più visualizzato nell'area riservata del cliente)

                ticketOnDB.isUsed = true
            })

            if (result[0] != 200) throw "Invalidazione fallita"
        })

    }

}


module.exports = TicketController;