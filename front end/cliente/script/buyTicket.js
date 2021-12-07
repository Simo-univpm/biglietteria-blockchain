
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, necessarie per acquistare un biglietto*/

/*La funzione permette al client di acquistare un nuovo biglietto. La funzione fa una richiesta HTTP di tipo GET al 
server passando come parametri l'id dell'evento di cui il client vuole comprare i biglietti e il numero di biglietti.
Il server reindirizzerà poi il client alla pagina di paypal su cui potrà effettuare il pagamento.

!!!NOTA!!! La funzione controlla il metodo di pagamento scelto dall'utente, ma solo paypal è disponibile. Gli altri non
sono implementati.*/

async function buyTicket() {

    eventID = new URLSearchParams(window.location.search).get("id")    //Legge il parametro (ID dell'evento) dalla query string
    numero_biglietti = document.getElementById("ticketNumber").value    //Ottiene il numero dei biglietti che vuole acquistare il client

    //Se il client seleziona un metodo di pagamento diverso da paypal, il sito avverte che il metodo di pagamento non è disponibile.

    if (document.getElementById("metodi_pagamento").value.replace("<img src=","").replace('.png style="width:4.6vw; "></img>',"")!="paypal")
        document.getElementById("info").style.setProperty("display","block")
    
    else
        window.location.href = "/api/tickets?id="+eventID+"&numero_biglietti="+numero_biglietti //Effettua la richiesta GET al server
}