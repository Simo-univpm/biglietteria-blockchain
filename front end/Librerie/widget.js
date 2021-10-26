
//Reindirizzamento ad una nuova pagina HTML

function cambiaPagina(url)
    {window.location.href=url}

//Crea e aggiunge un nuovo widget alla pagina html

function addWidget(tag,parent,proprietà)
{
    elemento=document.createElement(tag);
    if (proprietà != null)
    {
        let chiavi = Object.keys(proprietà)
        for (let i=0; i<chiavi.length; i++)
            elemento[chiavi[i]] = proprietà[chiavi[i]]
    }
    parent.appendChild(elemento);
    return elemento
}

//Aggiunge la barra di navigazione alla pagina html

function addNavigationBar(body,utente,privilegi)
{
    const bar = addWidget("div",body,{"className":"bar"});
    addWidget("img",bar,{"className":"logo","src":"immagini/logo.png"});
    
    const menu = addWidget("nav",body);
    const categorie = addWidget("ul",menu);
    nomi_categorie=["Cinema","Concerti","Musei","Partite","Teatro"]
    for (let i=0; i<nomi_categorie.length; i++)
        addWidget("a",categorie,{"className":"categoria","textContent":nomi_categorie[i],"href":"#","onclick":function (){window.location.href="eventi?categoria="+nomi_categorie[i]}});
    
    const sottomenu = addWidget("div",bar,{"className":"sottomenu"});
    addWidget("img",categorie,{"className":"user","src":"immagini/user.png","onclick":function (){sottomenu.style="display:block"}});
    //lista_biglietti.onclick = function (){sottomenu.style="display:none"}
    opzioni = {"cliente":[utente,"I miei biglietti","Log out"],"biglietteria":[utente,"Log out"],"event_manager":[utente,"Crea nuovo evento","Log out"]}
    for (let i=0; i<opzioni[privilegi].length; i++)
        addWidget("p",sottomenu,{"className":"opzione","textContent":opzioni[privilegi][i]})
}