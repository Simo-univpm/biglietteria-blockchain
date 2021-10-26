
//Genera la pagina contenente l'interfaccia per il login

function createLogInPage()
{
    const campi = [
        ["input",new Field(id="email",placeholder="E-mail",oninvalid="Inserisci un email valida",type="email")],
        ["input",new Field(id="password",placeholder="Password",oninvalid="Inserisci una password",type="password")],
        ["button",{"type":"submit","className":"form_button","id":"accedi","textContent":"Accedi"}],
        ["label",{"id":"password_dimenticata","textContent":"Password dimenticata?"}],
        ["hr",{"id":"separatore"}],
        ["button",{"type":"button","className":"form_button","id":"nuovo_account","onclick":function (){cambiaPagina('sign-in')},"textContent":"Crea nuovo account"}]
   ]
   createForm(campi,"login_body","login",["email","password"],"eventi.html?categoria=Cinema","/api/users/login")
}