const { request, response } = require("express");

const getCiclos = (req = request, res = response) => {
    res.json({ ok: true });
}
const getCiclo = (req = request, res = response) => {
    res.json({ ok: true });
}
const insertCiclo = (req = request, res = response) => {
    res.json({ ok: true });
}
const updateCiclo = (req = request, res = response) => {
    res.json({ ok: true });
}
const deleteCiclo = (req = request, res = response) => {
    res.json({ ok: true });
}

module.exports = {
    getCiclos,
    getCiclo,
    insertCiclo,
    updateCiclo,
    deleteCiclo,
};