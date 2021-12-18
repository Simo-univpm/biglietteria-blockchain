const express = require("express")

module.exports = {
    Annullatore: require("./web pages/annullatore"),
    Staff_biglietteria: require("./web pages/biglietteria"),
    Cliente: require("./web pages/cliente"),
    CSS: express.static(__dirname+"/CSS"),
    Organizzatore_eventi: require("./web pages/event manager"),
    Immagini: express.static(__dirname+"/images"),
    Scripts: express.static(__dirname+"/scripts"),
    UtenteOspite: require("./web pages/utente ospite")
}