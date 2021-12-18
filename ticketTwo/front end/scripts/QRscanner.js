
/* Questa funzione attiva la fotocamera dello scanner dei codici QR.

Richiede come parametro un riferimento allo scanner.
*/


function scan(scanner){

    // Imposta l'esecuzione della funzione decode ogni 2 secondi
    // La funzione decode tenta di decodificare il codice QR inquadrato dalla fotocamera

    const decoder = setInterval(() => decode(scanner),2000)


    // Facendo click sul video spengne la fotocamera

    scanner.onclick = () => stop(scanner,decoder)


    // Attiva il flusso video proveniente dalla fotocamera.

    if (navigator.mediaDevices.getUserMedia) navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => scanner.srcObject = stream)
}



/* Questa funzione spegne la fotocamera dello scanner dei codici QR.

Richiede come parametri:
    - un riferimento allo scanner,
    - un riferimento al decoder.
*/


function stop(scanner,decoder) {

    // Facendo click sul video riaccende la fotocamera

    scanner.onclick = () => scan(scanner)


    // Disattiva il decoder (veniva invocato ogni 2 secondi)

    clearInterval(decoder)


    // Chiude il flusso video proveniente dalla fotocamera.

    scanner.srcObject.getTracks()[0].stop();
    scanner.srcObject = null;
}



/* Questa funzione esegue uno screenshot del flusso video e tenta di decodificare 
il QRcode presente nell'immagine, se presente.

Richiede come parametro un riferimento allo scanner.
*/


async function decode(scanner){

    // Crea un elemento di tipo canvas e gli da le dimensioni del video

    const canvas = document.createElement("canvas")
    canvas.width = scanner.videoWidth
    canvas.height = scanner.videoHeight


    // Fa uno screenshot del flusso video in ingresso dalla fotocamera

    canvas.getContext('2d').drawImage(scanner,0,0,scanner.videoWidth,scanner.videoHeight)

    // Tenta di decodificare il codice QR contenuto nello screenshot (se ce n'è uno)

    const qrcode = jsQR(canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data,canvas.width,canvas.height)


    // Se la decodifica ha successo invia i dati del biglietto e la password del wallet al server
    
    if (qrcode) {

        // Invia i dati al server tramite una richiesta PATCH

        const data = {ticket: JSON.parse(qrcode.data), password: document.getElementById("Password_wallet").value}
        const response = await fetch("/api/tickets/invalida",{method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)})

        // Se la richiesta ha successo aggiorna la pagina, altrimenti stampa un messaggio informativo
        
        response.status == 200 ? window.location.href = "/tickets/annulla-biglietti" : showInfo(await response.text())
    }
}