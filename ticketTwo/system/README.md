# ticketTwo/system

In questa directory viene implementato il modulo software system che si occupa di processare le richieste che provengono dagli utenti del sit gestendo le interazioni con il database dell'applicazione web e con la blockchain quorum.

Il modulo è strutturato secondo un architettura Model View Controller.

- La cartella **controllers** contiene i moduli necessari per eseguire le operazioni richieste dai client (lettura o modifica dei dati nel database o invocazione di un metodo dello smart contract.
- La cartella **functions** contiene una serie di funzioni utilizzate spesso all'interno dei controller o dei middlewares.
- La cartella **middlewares** contiene delle funzioni che vengono eseguite prima di consentire ad un client di accedere ad una rotta.
- La cartella **model** contiene i modelli dei dati archiviati nel database.

Il modulo system si anche della compilazione e della distribuzione degli smart contract sulla blockchain.
