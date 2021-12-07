

async function changePassword() {

    const status = await fetch("/api/users/modifica-password",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(getFormData())}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/" //Se la registrazione ha successo, il client viene reindirizzato alla pagina di login
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}