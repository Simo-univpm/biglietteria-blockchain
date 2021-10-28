
async function createUtentiPage(){
    
    const utenti = await fetch("/api/users").then(value => {return value.json()})
    const body = document.getElementById("body")
    new Bar(body,"prova","biglietteria").add(body)
    new Table(utenti,"Utenti iscritti a ticketTwo","Nessun utente registrato").add(body)
}

createUtentiPage()