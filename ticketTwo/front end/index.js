const express = require("express")

module.exports = {
    Annullatore: require("./web pages/Modulo annullatore biglietti"),
    Staff_biglietteria: require("./web pages/Modulo gestione biglietti"),
    Cliente: require("./web pages/Modulo vendite biglietti"),
    CSS: express.static(__dirname+"/CSS"),
    Organizzatore_eventi: require("./web pages/Modulo amministrazione evento"),
    Immagini: express.static(__dirname+"/images"),
    Scripts: express.static(__dirname+"/scripts"),
    UtenteOspite: require("./web pages/Modulo utente ospite")
}