
//Genera una tabella contenente i dati passati per parametro

function creaTabella(body,campi,biglietti_emessi,header_text)
{
    addWidget("H1",body,{"className":"titolo_tabella","textContent":header_text})

    const tabella = addWidget("table",body,{"className":"tabella"})
    const intestazione = addWidget("tr",tabella);
    for (j=0; j<campi.length; j++)
        addWidget("th",intestazione,{"className":"intestazione","textContent":campi[j].charAt(0).toUpperCase()+campi[j].slice(1).replace("_"," ")});

    for (i=0; i<biglietti_emessi.length; i++)
    {
        const riga = addWidget("tr",tabella);
        for (j=0; j<campi.length; j++)
            addWidget("th",riga,{"className":"campo","textContent":biglietti_emessi[i][campi[j]]});
    }
}