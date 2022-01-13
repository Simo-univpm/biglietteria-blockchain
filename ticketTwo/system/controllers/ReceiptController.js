const Receipt = require('../model').Receipt;
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');

//Funzione per inviare le mail

const sendEmail = require('../functions/mailer').sendEmail

//Funzioni per interrogare il database

const create = require('../functions/query').create
const find = require('../functions/query').find

class ReceiptController {

    constructor(){}



    /*Questa funzione restituisce tutte le ricevute di pagamento relative ad un certo evento.

    La funzione richiede come parametro l'id dell'evento di cui si vogliono visualizzare le ricevute.

    La funzione restituisce lo stato della richiesta*/


    async getReceiptsByEvent(eventID){

        return find(Receipt,{eventID: eventID})
    }



    /*Questa funzione memorizza nel database la ricevuta di pagamento ottenuta da paypal.

    La funzione richiede come parametri:
        - i dati della ricevuta di pagamento,
        - la mail del cliente a cui inviare la ricevuta.

    La funzione restituisce lo stato della richiesta*/


    async emissioneRicevuta(paymentData,email){

        // CREAZIONE NUOVA RICEVUTA:

        return create(Receipt,{

            //Codice della ricevuta

            Codice_ricevuta: paymentData.id,


            //Metodo di pagamento (solo paypal è disponibile)
        
            Metodo_di_pagamento: paymentData.payer.payment_method,


            //Informazioni sull'utente che esegue il pagamento
        
            Email: paymentData.payer.payer_info.email,
            Nome: paymentData.payer.payer_info.first_name,
            Cognome: paymentData.payer.payer_info.last_name,


            //Informazioni sull'indirizzo di spedizione
        
            Via: paymentData.payer.payer_info.shipping_address.line1,
            Città: paymentData.payer.payer_info.shipping_address.city,
            Stato: paymentData.payer.payer_info.shipping_address.state,
            CAP: paymentData.payer.payer_info.shipping_address.postal_code,


            //Informazioni sulla transazione

            eventID: JSON.parse(paymentData.transactions[0].item_list.items[0].name).eventID,
            userID: JSON.parse(paymentData.transactions[0].item_list.items[0].name).userID,
            Prezzo: paymentData.transactions[0].item_list.items[0].price,
            Valuta: paymentData.transactions[0].item_list.items[0].currency,
            Numero_biglietti: paymentData.transactions[0].item_list.items[0].quantity,


            //Orario e data di emissione della ricevuta
        
            Data_emissione: getCurrentDate(),
            Orario_emissione: getCurrentTime()

        },receipt => {

            //Invia una mail al cliente con i dettagli della ricevuta

            const mail = ["Gentile cliente, la ringraziamo per aver scelto ticketTwo. Di seguito vengono elencati i dati relativi al suo pagamento.\n\n"]
                .concat(Object.keys(receipt.toJSON())).reduce((testo,campo) => testo += campo+": "+receipt[campo]+"\n")

            sendEmail("Acquisto biglietto ticketTwo",email,mail + "\n\nStaff ticketTwo")
        })
    }
}


module.exports = ReceiptController;