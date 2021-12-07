const CreaEvento = require("./creaEvento")


class AggiornaEvento extends CreaEvento{

    constructor(email,data) {

        super(email)
        this.addScript("updateEvent")
        this.logo.setAttribute("src","ModifyEvent.png")

        const chiavi = Object.keys(data)
        const campi = Object.keys(this)

        for (let i=0; i<chiavi.length;i+=1){

            if (campi.includes(chiavi[i]))
                this[chiavi[i]].setAttribute("value","'"+data[chiavi[i]]+"'")          
        }

        this.Icona_evento.setProperty("display","none")
        this.Icona_evento.setAttribute("disabled","true")
        this.Icona_evento.setAttribute("name","")

        this.button.setAttribute("value","'Aggiorna dati evento'")
        this.form.setAttribute("action","'javascript: updateEvent()'")

        const radio_buttons = this.type.children

        for (let i=0; i<radio_buttons.length; i+=1)
            if (data.type==radio_buttons[i].text)
                radio_buttons[i].setAttribute("checked","true")
        
    }

}



module.exports = AggiornaEvento;