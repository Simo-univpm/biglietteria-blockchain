const AreaRiservata = require("./areaRiservata")
const ConcediPrivilegi = require("./concediPrivilegi")
const CatalogoEventi = require("./catalogoEventi")
const ListaAnnullatori = require("./listaAnnullatori")
const ListaBiglietti = require("./listaBiglietti")
const ListaRicevute = require("./listaRicevute")
const ListaUtenti = require("./listaUtenti")
const MFA = require("./MFA")
const ModificaPassword = require("./modificaPassword")
const Profilo = require("./profilo")

module.exports = {
    AreaRiservata: AreaRiservata,
    ConcediPrivilegi: ConcediPrivilegi,
    CatalogoEventi: CatalogoEventi,
    ListaAnnullatori: ListaAnnullatori,
    ListaBiglietti: ListaBiglietti,
    ListaRicevute: ListaRicevute,
    ListaUtenti: ListaUtenti,
    ModificaPassword: ModificaPassword,
    MFA: MFA,
    Profilo: Profilo
}