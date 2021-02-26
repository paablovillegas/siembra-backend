const { request, response } = require("express");

const getAreas = (req = request, res = response) => {
    res.json({ ok: true });
}
const getArea = (req = request, res = response) => {
    res.json({ ok: true });
}
const insertArea = (req = request, res = response) => {
    res.json({ ok: true });
}
const updateArea = (req = request, res = response) => {
    res.json({ ok: true });
}
const deleteArea = (req = request, res = response) => {
    res.json({ ok: true });
}

module.exports = {
    getAreas,
    getArea,
    insertArea,
    updateArea,
    deleteArea,
}