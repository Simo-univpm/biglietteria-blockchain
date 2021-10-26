
//Genera una pagina contenente tutti i biglietti emessi per un dato evento

async function createBigliettiEmessiPage()
{
    const url = new URL(window.location.href);
    const ID_evento = url.searchParams.get("id");
    const biglietti = await fetch("/api/eventi/biglietti",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({id:ID_evento})}).then(value => {return value.json()})
    const body = document.getElementById("body")
    body.className = "biglietti_body"
    addNavigationBar(body,"prova","biglietteria")
    if (biglietti.biglietti_emessi.length>0)
        creaTabella(body,Object.keys(biglietti.biglietti_emessi[0]),biglietti.biglietti_emessi,"Biglietti emessi per l'evento "+biglietti.id)
    else
        addWidget("h5",body,{"className":"tabella_vuota","textContent":"Non è ancora stato emesso nessun biglietto per questo evento"})
}
