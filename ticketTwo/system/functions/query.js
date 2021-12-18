/* Questo file contiene tutte le funzioni necessari per interrogare il database 
dell'applicazione web.
*/



/* Questa funzione crea un nuovo documento all'interno del database.

La funzione richiede come parametri:
    - il modello del documento (Ticket, User, Event, ...),
    - un JSON contenente i dati da aggiungere al documento,
    - una callback da eseguire prima del salvataggio dei dati sul database.

La funzione restituisce lo stato della richiesta e l'output della query.
*/


async function create(model,campi,callback){
    
    try{

        const data = new model(campi)

        if (callback) await callback(data)

        await data.save()

        return [200, data]

    }catch(error){
        return [500, error];
    }
}



/* Questa funzione cancella un documento (la prima occorrenza che soddisfa la query) all'interno del database.

La funzione richiede come parametri:
    - il modello del documento (Ticket, User, Event, ...),
    - la query per cercare il documento (JSON).

La funzione restituisce lo stato della richiesta e l'output della query.
*/


async function deleteOne(model,query){
    
    try{

        return await model.deleteOne(query).then(data => {return !data.deletedCount ? [404, 'ERROR: 404 not found'] : [200, 'SUCCESS']})
        
    }catch(error){

        return [500, error];
    }  
}



/* Questa funzione trova tutti i documenti del database che soddifano la query.

La funzione richiede come parametri:
    - il modello del documento (Ticket, User, Event, ...),
    - la query per cercare il documento (JSON),
    - una callback da eseguire al termine della ricerca.

La funzione restituisce lo stato della richiesta e l'output della query.
*/


async function find(model,query,callback){
    
    try{

        const result = await model.find(query).then(data => {return !data ? [404, 'ERROR: 404 not found'] : [200, data]})

        if (callback) return callback(result[1])

        return result

    }catch(error){
        return [500, error];
    }
}



/* Questa funzione trova il primo documento del database che soddifa la query.

La funzione richiede come parametri:
    - il modello del documento (Ticket, User, Event, ...),
    - la query per cercare il documento (JSON),
    - una callback da eseguire al termine della ricerca.

La funzione restituisce lo stato della richiesta e l'output della query.
*/


async function findOne(model,query,callback){
    
    try{

        const result = await model.findOne(query).then(data => {return !data ? [404, 'ERROR: 404 not found'] : [200, data.toJSON()]})

        if (callback) return await callback(result[1])

        return result

    }catch(error){
        return [500, error];
    }
}



/* Questa funzione trova il primo documento del database che soddifa la query e lo aggiorna.

La funzione richiede come parametri:
    - il modello del documento (Ticket, User, Event, ...),
    - la query per cercare il documento (JSON),
    - una callback da eseguire prima del salvataggio dei dati sul database.

La funzione restituisce lo stato della richiesta e l'output della query.
*/


async function update(model,query,callback){
    
    try{

        const result = await model.findOne(query).then(data => {return !data ? [404, 'ERROR: 404 not found'] : [200, data]})

        if (callback) await callback(result[1])

        await result[1].save()
        return result

    }catch(error){
        return [500, error];
    }
}


module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.find = find;
module.exports.findOne = findOne;
module.exports.update = update;