


const body = document.getElementById("body")
body.style = 'background-image: url("immagini/LogIn.png")'

const campi = [
    new Field(id="email",placeholder="E-mail",oninvalid="Inserisci un email valida",type="email"),
    new Field(id="password",placeholder="Password",oninvalid="Inserisci una password",type="password"),
    new FormButton(id="Accedi",text="Accedi"),
    new PasswordDimenticata(),
    new FormButton(id="NuovoAccount",text="Crea nuovo account",onclick=function (){cambiaPagina('sign-in')}),
]

new Form(campi,"eventi.html?categoria=Cinema","/api/users/login","Login").add(body)



