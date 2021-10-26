
//Genera una pagina contenente tutti i biglietti emessi per un dato evento

async function createUtentiPage()
{
    const utenti = await fetch("/api/users").then(value => {return value.json()})
    console.log(utenti)
    const body = document.getElementById("body")
    body.className = "biglietti_body"
    addNavigationBar(body,"prova","biglietteria")
    if (utenti.length>0)
        creaTabella(body,Object.keys(utenti[0]),utenti,"Utenti iscritti a ticketTwo")
    else
        addWidget("h5",body,{"className":"tabella_vuota","textContent":"Nessun utente registrato"})
}
