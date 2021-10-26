
//Genera la pagina contenente un form per registrare i nuovi utenti

function createNewEventPage()
{
    const campi = [
        ["input",new Field(id="nome",placeholder="Nome")],
        ["input",new Field(id="data",placeholder="Data",oninvalid="Inserisci la data dell'evento",type="date")],
        ["input",new Field(id="orario",placeholder="Orario",oninvalid="Inserisci l'orario dell'evento",type="time")],
        ["input",new Field(id="luogo",placeholder="Luogo")],
        ["input",new Field(id="postiTotali",placeholder="Posti Totali",oninvalid="Inserisci il numero di posti",type="number")],
        ["input",new Field(id="immagine",placeholder="Carica un'immagine",oninvalid="Carica l'icona dell'evento",type="file")],
        ["input",new Field(id="prezzo",placeholder="Prezzo",oninvalid="Inserisci il prezzo del biglietto",type="number")],
        ["p",{"id":"type"}],
        ["button",{"className":"form_button","id":"registrati","textContent":"Crea evento"}]
    ]
    
    createForm(campi,"new_event_body","registrazione",'javascript:sendDataAndUploadImage("eventi.html?categoria=Cinema","/api/events")')
    addRadioButtons(document.getElementById("type"),["Cinema","Concerti","Musei","Partite","Teatro"])
}


function serializzaImmagine()
{
    const immagine = document.getElementById("immagine");         
    var reader = new FileReader();
    reader.readAsText(immagine.files[0])
    reader.onload = function() {
        fetch("/api/events/image",{method:'POST',headers:{'Content-Type':'application/json'},body:reader.result}).then(value => {return value.json()})
      };
}

function sendDataAndUploadImage(new_page,api)
{
    sendData(["nome","luogo","orario","prezzo","postiTotali","data","type"],new_page,api)
    serializzaImmagine()
}