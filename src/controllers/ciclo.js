const { request, response } = require("express");
const Ciclo = require("../models/Ciclo");
const Producto = require("../models/Producto");
const Tabla = require("../models/Tabla");

const getCiclos = async (req = request, res = response) => {
    try {
        const ciclos = await Ciclo.find().populate('producto tabla');
        return res.json({ ok: true, ciclos });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}
const getCiclo = async (req = request, res = response) => {
    const { uid } = req.params;
    Ciclo.findById(uid)
        .then(ciclo => Producto.populate(ciclo, { path: 'producto' }))
        .then(ciclo => Tabla.populate(ciclo, { path: 'tabla' }))
        .then(ciclo => res.json({ ok: true, ciclo }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al obtener al ciclo',
            });
        });
}

const insertCiclo = async (req = request, res = response) => {
    const ciclo = new Ciclo(req.body);
    ciclo.save()
        .then(ciclo => Producto.populate(ciclo, { path: 'producto' }))
        .then(ciclo => Tabla.populate(ciclo, { path: 'tabla' }))
        .then(ciclo => res.json({ ok: true, ciclo }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al crear el ciclo',
            });
        })
}

const updateCiclo = async (req = request, res = response) => {
    const { uid } = req.params;
    Ciclo.findByIdAndUpdate(uid, req.body, { new: true })
        .then(ciclo => Producto.populate(ciclo, { path: 'producto' }))
        .then(ciclo => Tabla.populate(ciclo, { path: 'tabla' }))
        .then(ciclo => res.json({ ok: true, ciclo }))
        .catch(err => {
            console.log(err);
            return res.status(500).json({ ok: false });
        });
}

const deleteCiclo = async (req = request, res = response) => {
    const { uid } = req.params;
    Ciclo.findByIdAndRemove(uid)
        .then(_ => res.json({ ok: true }))
        .catch(err => {
            console.log(err);
            return res.status(500).json({ ok: false });
        });
}

module.exports = {
    getCiclos,
    getCiclo,
    insertCiclo,
    updateCiclo,
    deleteCiclo,
};