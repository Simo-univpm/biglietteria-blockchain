
/*Questo modulo contiene le funzioni javascript, che verranno eseguite lato client, necessarie per aprire e chiudere
il menu a tendina della navigation bar.*/


/*Questa funzione permette al client di aprire il menu a tendina presente nella navigation bar
del sito web. La funziona controlla se il menu è chiuso (attributo is_open con valore 0). Se il
menu è chiuso lo apre e imposta l'attributo is_open a 2.

!!!NOTA!!! La funzione viene richiamata quando il client clicca sul pulsante con l'icona dell'utente. 
(vedi implementazione della classe Bar)*/


function openMenu(menu){

    if (menu.getAttribute("is_open")==0)    //se il menu è chiuso (is_open==0)
    {
        menu.style.setProperty("display","block");  //apre il menu
        menu.setAttribute("is_open",2)  //Imposta is_open a 2
    }
    
}



/*Questa funzione permette al client di chiudere il menu a tendina presente nella navigation bar
del sito web. La funziona controlla se il menu è aperto (attributo is_open con valore 1 o 2). Se il
menu è aperto lo chiude e decrementa il valore dell'attributo is_open.

!!!NOTA!!! La funzione viene richiamata quando il client clicca su un qualunque punto della pagina (in
particolare sul body).*/


function closeMenu(menu){

    let is_open = menu.getAttribute("is_open")  //ottiene il valore dell'attributo is_open

    if (is_open==1) menu.style.setProperty("display","none");   //se il menu è aperto e is_open==1 il menu viene chiuso
    if (is_open>0) is_open -= 1;    //decrementa il valore di is_open
    menu.setAttribute("is_open",is_open)    //imposta il valore dell'attributo
}