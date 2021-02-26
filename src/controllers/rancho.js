const { request, response } = require("express");
const Rancho = require("../models/rancho/Rancho");

const validateURL = async (req = request, res = response, next) => {
    const { uid } = req.params;
    if (!uid)
        return res.status(400).json({ ok: false });
    try {
        const rancho = await Rancho.findById(uid);
        if (!rancho)
            return res.status(400).json({
                ok: false,
                msg: 'Rancho no existente'
            });
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const getRanchos = async (req = request, res = response) => {
    try {
        const ranchos = await Rancho.find();
        return res.json({ ok: true, ranchos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const getRancho = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const rancho = await Rancho.findById(uid);
        return res.json({ ok: true, rancho });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const insertRancho = async (req = request, res = response) => {
    try {
        const rancho = new Rancho(req.body);
        rancho.save()
            .then(rancho => res.json({ ok: true, rancho }))
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    ok: false,
                    msg: 'Error al crear el rancho',
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const updateRancho = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const rancho = await Rancho
            .findByIdAndUpdate(uid, { ...req.body }, { new: true });
        return res.json({ ok: true, rancho });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const deleteRancho = (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Rancho.findByIdAndDelete(uid, (err, _) => {
            if (err)
                res.status(400).json({
                    ok: false,
                    msg: 'Error al eliminar el rancho',
                });
            return res.json({ ok: true });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

module.exports = {
    validateURL,
    getRanchos,
    getRancho,
    insertRancho,
    updateRancho,
    deleteRancho,
}