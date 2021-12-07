
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, necessarie per modificare i privilegi di un account*/


function showEventManagerField() {

    const event_manager_field = document.getElementById('Organizzatore')

    if (document.getElementById('Privilegi').value=='Organizzatore eventi'){
        event_manager_field.style.setProperty("display","block")
        event_manager_field.disabled = false
    }
        
    else{
        event_manager_field.style.setProperty("display","none")
        event_manager_field.disabled = true
        event_manager_field.value = ""
    }
        
}

async function grantPrivileges() {
    
    const status = await fetch("/api/users/privileges",{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(getFormData())}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200){
        window.location.href = "/eventi?type=Cinema"
    }
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore
}
