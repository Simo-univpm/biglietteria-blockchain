
//L'oggetto definisce la struttura di un campo di un form

class Field {
    constructor(id, placeholder, oninvalid="Riempire il campo", type="text", onchange=function () {this.setCustomValidity('')}) {
        this.id = id;
        this.placeholder = placeholder;
        this.className = "form_box";
        this.required = "true";
        this.oninvalid = function () {this.setCustomValidity(oninvalid)};
        this.onchange = onchange;
        this.type = type;
    }
}

//Crea un nuovo form con i dati passati per parametro

function createForm(campi,body_class,form_class,action)
{
    const body = document.getElementById("body")
    body.className = body_class
    const form = addWidget("form",body,{"className":form_class,"action":action})

    for (let i=0;i<campi.length;i+=1)
        addWidget(campi[i][0],form,campi[i][1])
}

//Aggiunge i radio buttons passati per parametro ad un contenitore

function addRadioButtons(contenitore,campi)
{
    for (let i=0;i<campi.length;i+=1)
    {
        addWidget("input",contenitore,{"type":"radio","name":"radio","id":campi[i],"value":campi[i],"required":"true","oninput":function () {contenitore.value=this.value}})
        contenitore.appendChild(document.createTextNode(campi[i]))
    }
}

//Invio dati form tramite richiesta post

async function sendData(campi,url,api)
{
    let data = {}

    for (let i=0;i<campi.length;i+=1)
        data[campi[i]]=document.getElementById(campi[i]).value;

    await fetch(api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(value => {return value.json()})

    //window.location.href=url;
}