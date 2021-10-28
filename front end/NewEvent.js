
const body = document.getElementById("body")
body.style = 'background-image: url("immagini/NewEvent.png")'

const campi = [
    new Field(id="nome",placeholder="Nome"),
    new Field(id="luogo",placeholder="Luogo"),
    new Field(id="data",placeholder="Data",oninvalid="Inserisci la data dell'evento",type="date"),
    new Field(id="orario",placeholder="Orario",oninvalid="Inserisci l'orario dell'evento",type="time"),
    new Field(id="postiTotali",placeholder="Posti Totali",oninvalid="Inserisci il numero di posti",type="number"),
    new Field(id="immagine",placeholder="Carica un'immagine",oninvalid="Carica l'icona dell'evento",type="file"),
    new Field(id="prezzo",placeholder="Prezzo",oninvalid="Inserisci il prezzo del biglietto",type="number"),
    new RadioButtons(id="type",["Cinema","Concerti","Musei","Partite","Teatro"]),
    new FormButton(id="registrati",text="Crea evento")
]
new Form(campi,"eventi.html?categoria=Cinema","/api/events").add(body)


/*
function serializzaImmagine()
{
    const immagine = document.getElementById("immagine");         
    var reader = new FileReader();
    reader.readAsText(immagine.files[0])
    reader.onload = function() {
        fetch("/api/events/image",{method:'POST',headers:{'Content-Type':'application/json'},body:reader.result}).then(value => {return value.json()})
      };
}*/