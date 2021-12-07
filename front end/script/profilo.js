
/*Questo modulo contiene le funzioni javascript, eseguite lato client, necessarie per aggiornare i dati di un account.*/


function modificaProfilo() {

    const button = document.getElementById("modifica_profilo")
    button.value = "Salva modifiche"
    button.onclick = salvaProfilo

    const campi = [...document.forms[0].elements["valore"]]

    for (let i=0;i<campi.length; i+=1){

        if (campi[i].id!="Mail" && campi[i].id!="Privilegi"){
            text_box = document.createElement("input")
            text_box.name = "field"
            text_box.value = campi[i].textContent
            text_box.id = campi[i].id
            text_box.style.setProperty("font-size","100%") //Dimenzione del testo del campo
            text_box.style.setProperty("height","36px") //Altezza del campo
            text_box.style.setProperty("width","99%") //Lunghezza del campo
            text_box.style.setProperty("padding-left","4%") //Spazio a sinistra del campo
            text_box.style.setProperty("margin-top","10px") //Distanza del campo dal bordo in alto
            text_box.style.setProperty("border","1px solid #ccc") //Tipo di bordo del campo
            text_box.style.setProperty("border-radius","10px") //Raggio del bordo del campo (rende il campo arrotondato)
            campi[i].after(text_box)
            campi[i].remove()
        }
        
    }

}


async function salvaProfilo() {
    
    const status = await fetch("/api/users",{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(getFormData())}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200){
        window.location.href = "/profilo"
    }
    else
        document.getElementById("info").style.setProperty("display","block")    //Altrimenti viene mostrato un opportuno messaggio d'errore

}