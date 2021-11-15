
const paypal = require('paypal-rest-sdk');

class Paypal {

    constructor()
    {
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'AV-HTD4fGeCdtcvfcRWN3bBZr_E7U1sVd-RahZr6Au_vaBhdMh_MSXoSR7fAuJ1-FiE7u6OQgx3VUHMC',
            'client_secret': 'EF4nko-x3ld5qiwzRe0Gkf5OHU0-qDa8lX4a5KH4fhnCIEWtERjmbWcLqCXAf8WYVwhXx7eevW_EUb3z'
        });
 
    }

    richiestaPagamento(res,nome_evento,prezzo,numero_biglietti){
        
        const amount = {"currency": "EUR", "total": prezzo*numero_biglietti}

        const create_payment_json = {
            "intent": "sale",
            "application_context":{
              "locale":"it_IT",
            },
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8080/api/pay/success",
                "cancel_url": "http://localhost:8080/api/pay/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": nome_evento,
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

    eseguiPagamento(res, payerId, paymentId){

        const execute_payment_json = {
            "payer_id": payerId,
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {

            if (error) {
                throw error;
            } else {
                res.send("success")
            }
        })
    }

}


module.exports = Paypal;