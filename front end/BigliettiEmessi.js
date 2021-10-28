
//Genera una pagina contenente tutti i biglietti emessi per un dato evento

async function createBigliettiEmessiPage()
{
    const url = new URL(window.location.href);
    const ID_evento = url.searchParams.get("id");
    const biglietti = await fetch("/api/events/biglietti",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({id:ID_evento})}).then(value => {return value.json()})
    const body = document.getElementById("body")
    new Bar(body,"prova","biglietteria").add(body)
    new Table(biglietti.biglietti_emessi,"Biglietti emessi per l'evento "+biglietti.id,"Non è ancora stato emesso nessun biglietto per questo evento").add(body)
}

createBigliettiEmessiPage()