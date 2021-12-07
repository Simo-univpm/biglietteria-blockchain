
/*Questo modulo contiene la funzioni javascript (lato client) necessaria per recuperare i dati contenuti nei campi di un form.*/


function getFormData(){

    let data = {}   //Istanzia un oggetto vuoto
    const campi = document.forms[0].elements["field"]

    for (let i=0; i<campi.length; i+=1)
        data[campi[i].id] = campi[i].value    //Inserisce i valori dei campi selezionati in un oggetto
    
    return data
}