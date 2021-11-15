
function confermaPassword(conferma_password)
{   
    if (document.getElementById('password').value!=conferma_password.value)
        conferma_password.setCustomValidity("Le due password non coincidono")
    else
        conferma_password.setCustomValidity("")
}

async function login(){

    let data = {email: document.getElementById("email").value, password: document.getElementById("password").value}   //Istanzia un oggetto contenente email e password inseriti dall'utente
    const response = await fetch("/api/users/login",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.json()}) //Richiesta post al server per inviare i dati di login
    if (Object.keys(response).length>0){
        document.cookie = "auth-token="+response.user.token+";path=/"
        window.location.href = "/eventi?type=Cinema"
    }
    else
        document.getElementById("info").style.setProperty("display","block")
    
}

async function logout(){

    document.cookie = "auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "/login"
}


function openMenu(menu){

    if (menu.getAttribute("is_open")==0)
    {
        menu.style.setProperty("display","block");
        menu.setAttribute("is_open",2)
    }
    
}

function closeMenu(menu){

    let is_open = menu.getAttribute("is_open")

    if (is_open==1) menu.style.setProperty("display","none");
    if (is_open>0) is_open -= 1;
    menu.setAttribute("is_open",is_open)
}


async function signin(){

    const campi = ["name","surname","email","tel","dateOfBirth","gender","password"]
    let data = {}   //Istanzia un oggetto vuoto

    for (let i=0; i<campi.length; i+=1)
        data[campi[i]] = document.getElementById(campi[i]).value

    const status = await fetch("/api/users/register",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.location.href = "/login"
    else
        document.getElementById("info").style.setProperty("display","block")
}

async function createEvent(){

    const campi = ["nome","luogo","data","orario","postiTotali","prezzo"]
    let data = {}   //Istanzia un oggetto vuoto

    for (let i=0; i<campi.length; i+=1)
        data[campi[i]] = document.getElementById(campi[i]).value
       
    data.immagine = await readFile(document.getElementById("immagine").files[0])

    const status = await fetch("/api/events",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then((res)=>{return res.status}); //Richiesta post al server per inviare i dati
    if (status==200)
        window.history.back()
    else
        document.getElementById("info").style.setProperty("display","block")
}

function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = res => {
        resolve(res.target.result);
      };
      reader.onerror = err => reject(err);
  
      reader.readAsDataURL(file);
    });
}

async function buyTicket() {

    eventID = new URLSearchParams(window.location.search).get("id"),
    numero_biglietti = document.getElementById("ticketNumber").value

    if (document.getElementById("metodi_pagamento").value.replace("<img src=","").replace(".png width=60px></img>","")!="paypal")
        document.getElementById("info").style.setProperty("display","block")
    
    else
        window.location.href = "/api/pay?id="+eventID+"&numero_biglietti="+numero_biglietti
}