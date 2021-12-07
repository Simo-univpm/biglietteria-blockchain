
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, utilizzate dagli organizzatori per eliminare un evento esistente (possibile solo se le vendite sono chiuse)*/

async function deleteEvent(){


    eventID = new URLSearchParams(window.location.search).get("id")    //Legge il parametro (ID dell'evento) dalla query string

    const status = await fetch("/api/events/"+eventID,{method:'DELETE',headers:{'Content-Type':'application/json'}}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/eventi?type=Cinema"   //Se la creazione dell'evento ha successo, il client viene reindirizzato alla pagina precedente
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}