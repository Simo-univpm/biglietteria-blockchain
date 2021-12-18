
/* Questa funzione permette ad un utente di aggiornare il proprio profilo personale. */


function modificaProfilo() {

    // Visualizza il pulsante per salvare le modifiche al profilo e nasconde quello premuto.

    document.forms[0].elements["button"].forEach(button => button.style.setProperty("display",button.type == "submit" ? "block" : "none"))


    // Ottiene una lista degli elementi contenuti nel form

    const valori = ([...document.forms[0].elements["field"]])


    // Traforma gli elementi del form in caselle di testo

    valori.forEach(campo => {

        // I campi "Mail", "Genere" e "Privilegi" non sono trasformati in caselle di testo (non si possono modificare)

        if (campo.id!="Mail" && campo.id!="Genere" && campo.id!="Privilegi"){
            
            text_box = document.createElement("input")
            text_box.name = "field"
            text_box.value = campo.textContent
            text_box.id = campo.id
            if (campo.id == "Data_di_nascita") text_box.type = "date"

            text_box.style.setProperty("font-size","1vw") //Dimensione del testo del campo
            text_box.style.setProperty("height","2vw") //Altezza del campo
            text_box.style.setProperty("width","34vw") //Lunghezza del campo
            if (campo.id != "Data_di_nascita") text_box.style.setProperty("padding-left","3vw") //Spazio a sinistra del campo
            
            text_box.style.setProperty("margin-top","1vw") //Distanza del campo dal bordo in alto
            text_box.style.setProperty("border","0.1vw solid #ccc") //Tipo di bordo del campo
            text_box.style.setProperty("border-radius","1vw") //Raggio del bordo del campo (rende il campo arrotondato)
            campo.after(text_box)
            campo.remove()
        }
        else campo.value = campo.textContent
})

}