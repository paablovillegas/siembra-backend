const { request, response } = require("express");

const getActividads = (req = request, res = response) => {
    res.json({ ok: true });
}
const getActividad = (req = request, res = response) => {
    res.json({ ok: true });
}
const insertActividad = (req = request, res = response) => {
    res.json({ ok: true });
}
const updateActividad = (req = request, res = response) => {
    res.json({ ok: true });
}
const deleteActividad = (req = request, res = response) => {
    res.json({ ok: true });
}

module.exports = {
    getActividads,
    getActividad,
    insertActividad,
    updateActividad,
    deleteActividad,
}