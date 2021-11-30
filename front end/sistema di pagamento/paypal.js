
const paypal = require('paypal-rest-sdk');


/*La classe Paypal permette di gestire i pagamenti dei biglietti appoggiandosi ad un sito
di pagamento esterno (paypal). Paypal fornisce una sandbox che permette di testare le 
transazioni per i pagamenti durante la fase di sviluppo del sito web. */

class Paypal {

    constructor()
    {
        paypal.configure({
            'mode': 'sandbox', //Per il progetto viene impostata la modalità sandbox (le transazioni paypal non sono reali!!!)
            'client_id': 'AV-HTD4fGeCdtcvfcRWN3bBZr_E7U1sVd-RahZr6Au_vaBhdMh_MSXoSR7fAuJ1-FiE7u6OQgx3VUHMC',    //ID dell'account sviluppatore paypal
            'client_secret': 'EF4nko-x3ld5qiwzRe0Gkf5OHU0-qDa8lX4a5KH4fhnCIEWtERjmbWcLqCXAf8WYVwhXx7eevW_EUb3z' //Segerto associato all'account
        });
 
    }


    /* La funzione effettua la richiesta di pagamento per un biglietto da parte di un cliente.
    La funzione richiede come parametri: la risposta HTTP, il nome dell'evento per cui si
    vogliono acquistare i biglietti, il prezzo di ciascun biglietto e il numero di biglietti.*/

    richiestaPagamento(res,userID,eventID,prezzo,numero_biglietti){
        
        const amount = {"currency": "EUR", "total": prezzo*numero_biglietti}    //Ammontare del pagamento

        const create_payment_json = {
            "intent": "sale",
            "application_context":{
              "locale":"it_IT",
            },
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8080/api/tickets/success",  //URL cui si viene reindirizzati se la richiesta ha successo
                "cancel_url": "http://localhost:8080/api/tickets/cancel"    //URL cui si viene reindirizzati se la richiesta fallisce
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": JSON.stringify({eventID:eventID,userID:userID}),
                        "price": prezzo,
                        "currency": "EUR",
                        "quantity": numero_biglietti
                    }]
                },
                "amount": amount,
                "description": "Pagamento bilietto verso tickeTwo"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href)
                  }
                }
            }
        });
    }

    /* La funzione esegue il pagamento per un biglietto da parte di un cliente.
    La funzione richiede come parametri: la risposta HTTP, l'ID del cliente che
    deve pagare e l'ID del pagamento. */

    async eseguiPagamento(res, payerId, paymentId){

        const execute_payment_json = {
            "payer_id": payerId,
        };

        return new Promise((resolve, reject) => {paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            
            if (error)
                reject(error)
            else 
                resolve(payment)
            
        })})

   
    }

}



module.exports = Paypal;