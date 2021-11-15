
const Widget = require("../front end/widget")
const Event = require("../front end/event")


class ListaEventi extends Widget{

    constructor(eventi,privilegi){
        super("div")    //Viene creato un tag di tipo div
        
        const copertina = new Widget("img")
        copertina.setAttribute("src","copertina.png")
        copertina.setProperty("width","100%")
        copertina.setProperty("padding-bottom","5px"); 
        copertina.setProperty("margin-bottom","20px"); 
        copertina.setProperty("padding-top","62px"); 
        copertina.setProperty("z-index","-1"); 
        copertina.setProperty("background-color","var(--tema)"); 

        this.addChild(copertina)

        for (let i=0; i<eventi.length; i+=1){
            const evento = new Event(eventi[i])

            if (privilegi==null){
                evento.addPrice()
                evento.addButton("Accedi e acquista","'/login'")
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore"])
            }

            else if (privilegi==0){
                evento.addPrice()
                evento.addButton("Acquista ora","'/acquista?id="+eventi[i].eventID+"'")
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore"])
            }

            else if (privilegi==1){
                evento.addButton("Modifica evento","'/pagamento'")
                evento.addButton("Gestione biglietti","'/pagamento'")
                evento.addButton("Gestione ingressi","'/pagamento'")
                evento.addData(["luogo","data","posti_disponibili","orario","eventCreationDate","eventCreationTime","prezzo"])
            }
                
            else if (privilegi==2){
                evento.addButton("Apri vendite","'/api/pay/apri-vendite?id="+eventi[i].eventID+"'")
                evento.addButton("Gestione biglietti","'/pagamento'")
                evento.addButton("Gestione ingressi","'/pagamento'")
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore","eventCreationDate","eventCreationTime","prezzo"])
            }
            
            else if (privilegi==2){
                evento.addButton("Invalida biglietti","'/pagamento'")
                evento.addButton("Gestione biglietti","'/pagamento'")
                evento.addButton("Gestione ingressi","'/pagamento'")
                evento.addData(["luogo","data","posti_disponibili","orario","organizzatore","eventCreationDate","eventCreationTime","prezzo"])
            }

            this.addChild(evento)
    }
        
    }

}


module.exports = ListaEventi;