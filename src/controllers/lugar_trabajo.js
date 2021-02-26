const { request, response } = require("express");

const getLugaresTrabajo = (req = request, res = response) => {
    res.json({ ok: true });
}
const getLugarTrabajo = (req = request, res = response) => {
    res.json({ ok: true });
}
const insertLugarTrabajo = (req = request, res = response) => {
    res.json({ ok: true });
}
const updateLugarTrabajo = (req = request, res = response) => {
    res.json({ ok: true });
}
const deleteLugarTrabajo = (req = request, res = response) => {
    res.json({ ok: true });
}

module.exports = {
    getLugaresTrabajo,
    getLugarTrabajo,
    insertLugarTrabajo,
    updateLugarTrabajo,
    deleteLugarTrabajo,
}