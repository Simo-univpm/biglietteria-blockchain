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
Seguire il manuale di installazione e configurazione presente nella relazione del progetto.

Per avviare il server bisogna lanciare il comando:

```
npm start //Avvia il server dell'applicazione web
```
Di default il server si mette in ascolto sulla porta 8080.
