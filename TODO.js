
//!!!! DA FARE ========================================================================
// fare contratto
// implementare interazione col contratto in .../success

// Decrementare numero posti quando si compra un biglietto
// Blocca wallet con password
// Implementa chiudi vendite (bisogna aggiornare lo smart contract)

// Gestire eccezioni 


//!!!! DOMANDE ========================================================================

// Salvare anche l'abi sul db???
// L'user va messo dentro il body???

//!!!! FATTO ==========================================================================
// Cifra dati utente (dati personali) (I dati sul db sono cifrati e autenticati per garantire confidenzialità e integrità)
// Come si creano gli account su quorum?? Come gestiamo le chiavi private??
// L'autenticazione a più fattori la mettiamo?? magari tramite email
// Implementare sigillo fiscale
// annullare il biglietto
// mettere chiave privata e certificato nel file env??? --> si
// Creare controller per le ricevute (byEvent,creaRicevuta)
// Gestire l'invio di una mail per recuperare la password??????
// Inviare una mail quando viene emesso il biglietto????? (invia la ricevuta di pagamento)
// Inviare una mail quando ci si iscrive al sito
// Bisogna salvare le ricevute di pagamento nel database
// Creare api per eliminare un evento (solo dal db quando non è ancora in vendita)
// Creare modello per la ricevuta
// Va aggiunto il protocollo https!!! (Basta aggiungere una libreria)
// L'autenticazione adesso funziona
// Il controllo dei privilegi funziona
// Le chiamate alla blockchain funzionano
// Aggiunto paypal come servizio di pagamento (è molto semplice da usare) (lo lasciamo o mettiamo altro????)
// Aggiungere un campo all'evento per dire se i biglietti sono in vendita o meno????
// Fare una pagina web in cui ci sono tutti i biglietti acquistati da un utente
// Quali dati usiamo per generari il QR code del biglietto --> dati del biglietto valido + dati utente che possiede il biglietto + hash di questi 2

// Bisogna creare una funzione per filtrare gli eventi in base all'organizzatore
// Aggiungere un campo all'evento per gli artisti
// Negli utenti va aggiunto un campo per l'indirizzo dell'account su blockchain
// Negli eventi va aggiunto un campo per l'indirizzo del contratto associato
// Bisogna creare il modello per i biglietti nel database.
// Sistemare area riservata
// Aggiungere api per modificare un evento già esistente
// Aggiungere api per modificare un utente già esistente
// Nel database memorizziamo l'immagine dell'evento o il percorso???? --->>>immagine