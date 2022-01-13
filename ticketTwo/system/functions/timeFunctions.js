// funzioni per manipolare data e ora

// ritorna una stringa con la data corrente
function getCurrentDate(){

    const today = new Date();
    const date = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    
    return date;

}


// ritorna una stringa con l'ora corrente
function getCurrentTime(){

    const today = new Date();

    const hours = today.getHours();
    const minutes = (today.getMinutes()<10?'0':'') + today.getMinutes();
    const time = hours + ":" + minutes;

    return time;

}


// esportazione delle funzioni
module.exports.getCurrentDate = getCurrentDate;
module.exports.getCurrentTime = getCurrentTime;