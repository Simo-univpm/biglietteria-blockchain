const Receipt = require('../model/receipt/Receipt');
const { getCurrentDate, getCurrentTime } = require('../functions/timeFunctions');
const sendEmail = require('../functions/mailer').sendEmail


class ReceiptController {

    constructor(){}

    async getReceiptByEvent(eventID){
        
        const receipt = await Receipt.find({"items.eventID": eventID});
        if( ! receipt) return [404, 'ERROR: receipt not found'];

        try{
            return [200, receipt];
        }catch{
            return [500, 'SERVER ERROR'];
        }

    }

    async createReceipt(paymentData,email){
        
        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();

        // CREAZIONE NUOVO EVENTO:
        const receipt = new Receipt({

            id: paymentData.id,
        
            payment_method: paymentData.payer.payment_method,
        
            payer_info: {
                email: paymentData.payer.payer_info.email,
                first_name: paymentData.payer.payer_info.first_name,
                last_name: paymentData.payer.payer_info.last_name,
                payer_id: paymentData.payer.payer_info.payer_id
            },
        
            shipping_address: {
                recipient_name: paymentData.payer.payer_info.shipping_address.recipient_name,
                line1: paymentData.payer.payer_info.shipping_address.line1,
                city: paymentData.payer.payer_info.shipping_address.city,
                state: paymentData.payer.payer_info.shipping_address.state,
                postal_code: paymentData.payer.payer_info.shipping_address.postal_code,
                country_code: paymentData.payer.payer_info.shipping_address.country_code
            },

            
        
            items: {
                eventID: JSON.parse(paymentData.transactions[0].item_list.items[0].name).eventID,
                userID: JSON.parse(paymentData.transactions[0].item_list.items[0].name).userID,
                price: paymentData.transactions[0].item_list.items[0].price,
                currency: paymentData.transactions[0].item_list.items[0].currency,
                quantity: paymentData.transactions[0].item_list.items[0].quantity
            },
        
            registerDate: currentDate,
            registerTime: currentTime

        });

        try{
            const savedReceipt = await receipt.save();
            let testo = "Gentile cliente, la ringraziamo per aver scelto ticketTwo. Di seguito vengono elencati i dati relativi al suo pagamento.\n\n "
            const data = receipt.toJSON()
            const campi = Object.keys(data)
            for (let i=0;i<campi.length;i+=1){
                if (data[campi[i]] instanceof Object){
                    const campi2 = Object.keys(data[campi[i]])
                    for (let j=0;j<campi2.length;j+=1){
                        if (campi2[j]!="_id")
                            testo += campi2[j]+": "+data[campi[i]][campi2[j]]+"\n"
                    }  
                }
                else if ((campi[i]!="_id")&&(campi[i]!="__v"))
                    testo += campi[i]+": "+data[campi[i]]+"\n"
            }
                
            testo += "\n\nStaff ticketTwo"
            sendEmail("Acquisto biglietto ticketTwo",email,testo)
            return [200, 'SUCCESS: receipt with id [' + savedReceipt.id + '] created'];   
        }catch(err){
            return [500, "SERVER ERROR: couldn't save receipt " + err];
        }
        
    }

}


module.exports = ReceiptController;