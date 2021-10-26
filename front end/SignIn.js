
//Genera la pagina contenente un form per registrare i nuovi utenti

function createSignInPage()
{
    const campi = [
        ["input",new Field(id="name",placeholder="Nome")],
        ["input",new Field(id="surname",placeholder="Cognome")],
        ["input",new Field(id="email",placeholder="E-mail",oninvalid="Inserisci un email valida",type="email")],
        ["input",new Field(id="tel",placeholder="Telefono",oninvalid="Inserisci un numero di telefono valido",type="tel")],
        ["input",new Field(id="dateOfBirth",placeholder="Data di nascita",oninvalid="Inserisci la data di nascita",type="date")],
        ["p",{"id":"gender"}],
        ["input",new Field(id="password",placeholder="Password",oninvalid="Inserisci una password",type="password")],
        ["input",new Field(id="conferma_password",placeholder="Conferma password",oninvalid="Le due password non coincidono"),type="password",onchange=function () {confermaPassword()}],
        ["button",{"className":"form_button","id":"registrati","textContent":"Registrati"}]
    ]

    createForm(campi,"registrazione_body","registrazione",'javascript:sendData(["name","surname","gender","dateOfBirth","email","tel","password"],"/","/api/users/register")'
    )
    addRadioButtons(document.getElementById("gender"),["Donna","Uomo","Altro"])
}
//Controlla se le due password inserite sono identiche

function confermaPassword()
{   
    const conferma_password=document.getElementById('conferma_password')
    if (document.getElementById('password').value!=conferma_password.value)
        conferma_password.setCustomValidity(" ")
    else
        conferma_password.setCustomValidity("")
}
