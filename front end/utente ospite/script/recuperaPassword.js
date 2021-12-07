
async function recuperaPassword(){

    const status = await fetch("/api/users/recupera-password",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({"Mail":document.getElementById("Mail").value})}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/?id=Cinema" //Se il recupero della password ha avuto successo, il client viene reindirizzato alla pagina di login
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}