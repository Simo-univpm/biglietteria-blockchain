
function scan(scanner){

    const decoder = setInterval(() => decode(scanner),2000)

    scanner.onclick = () => stop(scanner,decoder)

    if (navigator.mediaDevices.getUserMedia) 
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => scanner.srcObject = stream).catch((error) => console.log(error));

}

function stop(scanner,decoder) {

    
    scanner.onclick = () => scan(scanner)

    clearInterval(decoder)

    const stream = scanner.srcObject;
    stream.getTracks()[0].stop();
    scanner.srcObject = null;
}

async function decode(scanner){
    
    const canvas = document.createElement("canvas");
    canvas.width = scanner.videoWidth;
    canvas.height = scanner.videoHeight;
    canvas.getContext('2d').drawImage(scanner,0,0,canvas.width,canvas.height);
    const qrcode = canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height)
    
    const ticket = jsQR(qrcode.data,qrcode.width,qrcode.height)
    if (ticket){
        const status = await fetch("/api/tickets/invalida",{method:'PATCH',headers:{'Content-Type':'application/json'},body:ticket.data}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/annulla-biglietti"   //Se la creazione dell'evento ha successo, il client viene reindirizzato alla pagina precedente
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
    }

}