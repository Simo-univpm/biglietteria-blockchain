
//Genera una pagina contenente tutti gli eventi prenotabili sul sito

async function createEventiPage()
{
    const eventi = await fetch("/api/events").then(value => {return value.json()})
    
    const url = new URL(window.location.href);
    const categoria = url.searchParams.get("categoria");
    const body = document.getElementById("body")
    body.className = "eventi_body"
    addNavigationBar(body,"prova","biglietteria")
    selezionaEvento(body,eventi[categoria],"biglietteria")
}

//Seleziona e mostra tutti gli eventi relativi ad una certa categoria

function selezionaEvento(body,tipo_evento,privilegi)
{	
    const lista_biglietti = addWidget("div",body,{"className":"lista_biglietti"});
    lista_biglietti.innerHTML = "";
    for (let i=0; i<tipo_evento.length; i++)
    {
        const biglietto = addWidget("div",lista_biglietti,{"className":"biglietto"});

        const colonna_sinistra = addWidget("div",biglietto,{"className":"colonna_sinistra"});
        addWidget("img",colonna_sinistra,{"src":"immagini/"+tipo_evento[i]["immagine"]});

        const colonna_centrale = addWidget("div",biglietto,{"className":"colonna_centrale"});
        addWidget("h1",colonna_centrale,{"className":"titolo","textContent":tipo_evento[i].nome});
        addWidget("br",colonna_centrale);
        attributi=["luogo","data","posti_disponibili","orario","organizzatore"];
        for (let j=0; j<attributi.length; j++)
            campo = addWidget("p",colonna_centrale,{"className":"dettagli_evento","textContent":attributi[j].charAt(0).toUpperCase()+attributi[j].slice(1).replace("_"," ")+": "+tipo_evento[i][attributi[j]]});

        const colonna_destra = addWidget("div",biglietto,{"className":"colonna_destra"});
        addWidget("p",colonna_destra,{"className":"prezzo","textContent":tipo_evento[i]["prezzo"]+" €\n"});
        addWidget("br",colonna_destra);
        if (privilegi=="cliente")
            addWidget("button",colonna_destra,{"className":"pulsante","textContent":"Acquista ora","onclick":function () {cambiaPagina("pagamento")}});
        else
            addWidget("button",colonna_destra,{"className":"pulsante","textContent":"Gestisci biglietti","onclick":function () {cambiaPagina("/biglietti?id="+tipo_evento[i].id)}});

        addWidget("br",lista_biglietti);
    }
}