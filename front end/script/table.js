function enableHover(line) {

    const items = line.parentNode.childNodes
    for(let i=0; i<items.length; i+=1)
        items[i].style.setProperty('background-color','#D4D4DB')
        
}

function disableHover(line) {

    const items = line.parentNode.childNodes
    for(let i=0; i<items.length; i+=1)
        items[i].style.setProperty('background-color','white')
        
}
