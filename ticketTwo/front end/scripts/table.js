
/* Questa funzione modifica il colore di una riga della tabella.

Richiede come parametro la riga della tabella. */


function enableHover(line) {

    line.parentNode.childNodes.forEach(item => item.style.setProperty('background-color','#D4D4DB'))
}



/* Questa funzione ripristina il colore originario di una riga della tabella.

Richiede come parametro la riga della tabella. */


function disableHover(line) {

    line.parentNode.childNodes.forEach(item => item.style.setProperty('background-color','white'))
        
}