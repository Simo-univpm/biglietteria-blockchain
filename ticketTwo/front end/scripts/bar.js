
/*Questa funzione permette al client di aprire il menu a tendina presente nella navigation bar
del sito web. La funziona controlla se il menu è chiuso (attributo is_open con valore 0). Se il
menu è chiuso lo apre e imposta l'attributo is_open a 2.

La funzione richiede come parametro un riferimento al menu a tendina.

!!!NOTA!!! La funzione viene richiamata quando il client clicca sul pulsante con l'icona dell'utente. 
(vedi implementazione della classe Bar)*/


function openMenu(menu){

    // Se il menu è chiuso (is_open==0) lo apre

    if (menu.getAttribute("is_open")==0)    
    {
        // Mostra il menu a tendina

        menu.style.setProperty("display","block");  


        //Imposta is_open a 2

        menu.setAttribute("is_open",2)  
    }
    
}



/*Questa funzione permette al client di chiudere il menu a tendina presente nella navigation bar
del sito web. La funziona controlla se il menu è aperto (attributo is_open con valore 1 o 2). Se il
menu è aperto lo chiude e decrementa il valore dell'attributo is_open.

La funzione richiede come parametro un riferimento al menu a tendina.

!!!NOTA!!! La funzione viene richiamata quando il client clicca su un qualunque punto della pagina (in
particolare sul body).*/


function closeMenu(menu){

    // Ottiene il valore dell'attributo is_open

    let is_open = menu.getAttribute("is_open")


    // Se il menu è aperto e (is_open == 1) il menu viene chiuso

    if (is_open==1) menu.style.setProperty("display","none")


    // Decrementa il valore di is_open

    if (is_open>0) is_open -= 1


    // Imposta il valore dell'attributo

    menu.setAttribute("is_open",is_open)
}