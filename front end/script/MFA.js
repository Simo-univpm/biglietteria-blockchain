

async function sendOTP(redirect_url){

    const response = await fetch("/api/users/mfa",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({OTP: document.getElementById("OTP").value})}).then((res)=>{return {status: res.status, token: res.headers.get("OTP-token")}}) //Richiesta post al server per inviare i dati di login
    if (response.status==200){
        document.cookie = "OTP-token="+response.token+";expires="+(new Date(Date.now()+ 60*1000)).toUTCString()+";path=/"   //Aggiunge il token ai cookies
        window.location.href = redirect_url    //Reindirizza alla pagina specificata come parametro
    }
    else
        document.getElementById("info").style.setProperty("display","block")    //Stampa un messaggio d'errore*/

}