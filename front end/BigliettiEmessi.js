
//Genera una pagina contenente tutti i biglietti emessi per un dato evento

async function createBigliettiEmessiPage()
{
    const url = new URL(window.location.href);//fetcha l'url della pagina
    const ID_evento = url.searchParams.get("id");//legge il parametro passato in get dall'URL di cui alla linea di codice precedente
    const biglietti = await fetch("/api/events/biglietti",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({id:ID_evento})}).then(value => {return value.json()})//prende l'id e quindi crea una query string in POST al backend per estrarre i record relativi ai biglietti emessi corrispondenti all'id letto
    const body = document.getElementById("body")
    new Bar(body,"prova","biglietteria").add(body)
    new Table(biglietti.biglietti_emessi,"Biglietti emessi per l'evento "+biglietti.id,"Non è ancora stato emesso nessun biglietto per questo evento").add(body)
//nella linea 10 e 11 vengono passati gli elementi della pagina html da riempire con i dati estratti dal db alla linea 8
}


createBigliettiEmessiPage()