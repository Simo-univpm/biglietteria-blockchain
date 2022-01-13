
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //Per il progetto viene impostata la modalità sandbox (le transazioni paypal non sono reali!!!)
    'client_id': process.env.CLIENT_ID_PAYPAL,    //ID dell'account sviluppatore paypal
    'client_secret': process.env.CLIENT_SECRET_PAYPAL //Segerto associato all'account
});



/* Questa funzione verifica inoltra la richiesta di pagamento da parte di un cliente ai server di paypal.
Paypal è il servizio di pagamento che abbiamo scelto per gestire gli acquisti dei nostri biglietti.

La funzione richiede come parametri:
    - l'id dell'utente che vuole acquistare i biglietti,
    - l'id dell'evento di cui si vogliono acquistare i biglietti,
    - il prezzo di un singolo biglietto;
    - la quantità dei biglietti da acquistare.

La funzione restituisce il link (link al sito di paypal) in cui il cliente può eseguire il pagamento dei biglietti.

*/

async function richiestaPagamento(userID,eventID,prezzo,numero_biglietti){

    const payment_json = {

        "intent": "sale",
        "application_context":{
          "locale":"it_IT",
        },
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://localhost:8080/api/tickets/emetti-biglietti",  //URL cui si viene reindirizzati se la richiesta ha successo
            "cancel_url": "https://localhost:8080/eventi?type=Cinema"    //URL cui si viene reindirizzati se la richiesta fallisce
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": JSON.stringify({eventID: eventID, userID: userID}),
                    "price": prezzo,
                    "currency": "EUR",
                    "quantity": numero_biglietti
                }]
            },
            "amount": {"currency": "EUR", "total": prezzo * numero_biglietti},    //Ammontare del pagamento
            "description": "Pagamento bilietto verso tickeTwo"
        }]
    };

    return new Promise((resolve, reject) => paypal.payment.create(payment_json, function (error, payment) {
        
        error ? reject(error) : resolve(payment.links.find(link => link.rel == 'approval_url').href)
    }))
}



/* Questa funzione verifica esegue il pagamento dei biglietti da parte di un cliente.

La funzione richiede come parametri:
    - l'id dell'utente che effettua il pagamento (id associato all'account paypal)
    - l'id del pagamento associato alla richiesta d'acquisto.

La funzione restituisce un oggetto (JSON) contenente:
    - la ricevuta di pagamento,
    - l'id dell'utente che ha acquistato i biglietti (id dell'account ticketTwo)
    - l'id dell'evento di cui si vogliono acquistare i biglietti,
    - il numero di biglietti acquistati.

*/

async function eseguiPagamento(payerId,paymentId){

    return new Promise((resolve, reject) => paypal.payment.execute(paymentId, {"payer_id": payerId}, function (error, payment) {
        
        error ? reject(error) : resolve({
        
            ricevuta: payment, 
            userID:JSON.parse(payment.transactions[0].item_list.items[0].name).userID, 
            eventID:JSON.parse(payment.transactions[0].item_list.items[0].name).eventID, 
            numero_biglietti: payment.transactions[0].item_list.items[0].quantity
        })
    }))
}


module.exports.richiestaPagamento = richiestaPagamento
module.exports.eseguiPagamento = eseguiPagamento
