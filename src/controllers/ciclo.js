const { request, response } = require("express");
const Ciclo = require("../models/Ciclo");

const getCiclos = async (req = request, res = response) => {
    try {
        const ciclos = await Ciclo.find().populate('producto');
        return res.json({ ok: true, ciclos })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}
const getCiclo = async (req = request, res = response) => {
    const { tid, uid } = req.params;
    try {
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const insertCiclo = async (req = request, res = response) => {
    try {
        const ciclo = new Ciclo(req.body);
        await ciclo.save();
        return res.json({ ok: true, ciclo });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const updateCiclo = async (req = request, res = response) => {
    const { tid, uid } = req.params;
    try {
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const deleteCiclo = async (req = request, res = response) => {
    const { tid, uid } = req.params;
    try {
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    getCiclos,
    getCiclo,
    insertCiclo,
    updateCiclo,
    deleteCiclo,
};