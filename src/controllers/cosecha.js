const { request, response } = require("express");
const Cosecha = require("../models/cosecha/Cosecha");

const getCosechas = (req = request, res = response) => {
    Cosecha.find()
        .then(cosecha => res.json({ ok: true, cosecha }))
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: 'Error al obtener el ciclo'
            });
        });
};

const getCosecha = async (req = request, res = response) => {
    const { uid } = req.params;
    Cosecha.findById(uid)
        .then(cosecha => {
            if (cosecha)
                return res.json({ ok: true, cosecha })
            return res.status(400).json({ ok: false, cosecha })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: 'Error al obtener el ciclo'
            });
        });
};

const insertCosecha = async (req = request, res = response) => {
    let cosecha = new Cosecha(req.body);
    cosecha.save()
        .then(cosecha => res.json({ ok: true, cosecha }))
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: 'Error al insertar el ciclo'
            });
        });
}

const updateCosecha = async (req = request, res = response) => {
    const { uid } = req.params;
    Cosecha.findByIdAndUpdate(uid, req.body, { new: true })
        .then(cosecha => res.json({ ok: true, cosecha }))
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: 'Error al actualizar el ciclo'
            });
        });
}

const deleteCosecha = async (req = request, res = response) => {
    const { uid } = req.params;
    Cosecha.findByIdAndDelete(uid)
        .then(_ => res.json({ ok: true }))
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: 'Error al eliminar el ciclo'
            });
        });
}

module.exports = {
    getCosechas,
    getCosecha,
    insertCosecha,
    updateCosecha,
    deleteCosecha,
};