<img width="464" alt="java 8 and prio java 8  array review example" src="https://github.com/Simo-univpm/biglietteria-blockchain/blob/main/ticketTwo/front%20end/images/form_logo.png">




Progetto per il corso di Software Cybersecurity che prevede l'implementazione di una biglietteria online basata su una blockchain Quorum.

L'applicazione web permette di :
- Aggiungere nuovi eventi al catalogo del sito,
- Acquistare biglietti per gli eventi presenti nel catalogo,
- Invalidare i biglietti al momento dell'ingresso all'evento.

Le operazioni di richiesta, emissione ed invalidazione dei biglietti sono eseguite da un'istanza di uno smart contract distribuita su una blockchain locale, mentre le operazioni di apposizione e verifica del sigillo fiscale e la gestione dei pagamenti sono eseguite offchain.

Per quanto riguarda la gestione dei pagamenti abbiamo deciso di affidarci ad un servizio di pagamento esterno, in particolare PayPal. L'applicazione interagisce con una sandbox che ci ha permesso di testare le funzioni relative all'acquisto dei biglietti e alla gestione dei pagamenti senza rischi. L'applicazione può essere facilmente configurata per interagire con il sistema Paypal reale.

https://developer.paypal.com/docs/business/get-started/

Per testare l'acquisto dei biglietti tramite PayPal è stato utilizzato un account di prova generato nella sandbox le cui credenziali di accesso sono:
- **username**: cliente.tickettwo@gmail.com
- **password**: ticketTwo!

Quando durante la fase di acquisto dei biglietti si viene reindirizzati al sito di PayPal inserire le precedenti credenziali per autorizzare il pagamento.

Per installare il server dell'applicazione web è necessario scaricare il repository da github, aprire un terminale all'interno della cartella del progetto e lanciare il comando:
```
npm i //Installa i pacchetti node JS necessari per il funzionamento dell'app
```

Per evitare problemi si consiglia di utilizzare l'ultima versione di Node.js.

Per avviare il server bisogna lanciare il comando:

```
npm start //Avvia il server dell'applicazione web
```
Di default il server si mette in ascolto sulla porta 8080.

Per maggiori informazioni seguire il manuale di installazione, configurazione e utilizzo presente nella relazione del progetto.

Per testare il sito web sono stati creati quattro account, uno per ogni diversa tipologia di attore.

A ciascuno di questi account è associato un wallet Quorum, che permette agli utenti di interagire con lo smart contract che gestisce i biglietti. 

Gli wallet vengono memorizzati sulla blockchain a cui è connesso il sito. Per la fase di testing è stata utilizzata una blockchain locale, quindi eseguendo il server su una macchina diversa gli wallet non verranno trovati, rendendo impossibile l'interazione con lo smart contract.

Per risolvere il problema è sufficiente accedere all'area riservata del sito e modificare l'indirizzo del wallet associato all'account, sostituendolo con uno presente sulla blockchain che si sta utilizzando.

-----------------------------------------

**Cliente**

clienteTicketTwo@gmail.com

**password email:** progettoSwCs

**password ticketTwo:** progettoSwCs!

-----------------------------------------

**Staff biglietteria**

biglietteriaTicketTwo@gmail.com

**password email:** progettoSwCs

**password ticketTwo:** progettoSwCs!

-----------------------------------------

**Annullatore biglietti**

annullatoreTicketTwo@gmail.com

**password email:** progettoSwCs

**password ticketTwo:** progettoSwCs!

-----------------------------------------

**Organizzatore eventi**

managerTicketTwo@gmail.com

**password email:** progettoSwCs

**password ticketTwo:** progettoSwCs!
