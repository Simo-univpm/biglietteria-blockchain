

async function selezionaAnnullatore(line) {
    
    eventID = new URLSearchParams(window.location.search).get("id")    //Legge il parametro (ID dell'evento) dalla query string
    const WalletAddress = line.childNodes[4].textContent

    const status = await fetch("/api/events/apri-vendite",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventID: eventID, annullatore: WalletAddress})}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status!=401)
        window.location.href = "/eventi?type=Cinema"
    else
        window.location.href = "/annullatori"
}
