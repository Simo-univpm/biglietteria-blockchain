
function selezionaEvento(body,eventi,privilegi)
{	
    const lista_eventi = new Widget("div","ListaEventi").add(body);
    lista_eventi.innerHTML = "";
    
    for (let i=0; i<eventi.length; i++)
        new Event(eventi[i],privilegi).add(lista_eventi)
}

async function createEventiPage(){
    const url = new URL(window.location.href);
    const categoria = url.searchParams.get("categoria");
    const eventi = await fetch("/api/events/"+categoria).then(value => {return value.json()})
    const body = document.getElementById("body")
    new Bar(body,"prova","biglietteria").add(body)
    selezionaEvento(body,eventi,"biglietteria")
}

createEventiPage()