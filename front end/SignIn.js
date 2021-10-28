
function confermaPassword()
{   
    const conferma_password=document.getElementById('conferma_password')
    if (document.getElementById('password').value!=conferma_password.value)
        conferma_password.setCustomValidity(" ")
    else
        conferma_password.setCustomValidity("")
}

const body = document.getElementById("body")
body.style = 'background-image: url("immagini/SignIn.png")'

const campi = [
    new Field(id="name",placeholder="Nome"),
    new Field(id="surname",placeholder="Cognome"),
    new Field(id="email",placeholder="E-mail",oninvalid="Inserisci un email valida",type="email"),
    new Field(id="tel",placeholder="Telefono",oninvalid="Inserisci un numero di telefono valido",type="tel"),
    new Field(id="dateOfBirth",placeholder="Data di nascita",oninvalid="Inserisci la data di nascita",type="date"),
    new RadioButtons(id="gender",["Donna","Uomo","Altro"]),
    new Field(id="password",placeholder="Password",oninvalid="Inserisci una password",type="password"),
    new Field(id="conferma_password",placeholder="Conferma password",oninvalid="Le due password non coincidono",type="password",onchange=function () {confermaPassword()}),
    new FormButton(id="registrati",text="Registrati")
]

new Form(campi,"/","/api/users/register").add(body)
