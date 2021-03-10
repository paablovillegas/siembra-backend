const { request, response } = require("express");
const Rancho = require("../models/Rancho");
const Tabla = require("../models/Tabla");

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
        res.setHeader('tablas', JSON.stringify(rancho.tablas));
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const getRanchos = async (req = request, res = response) => {
    try {
        const ranchos = await Rancho.find().populate('tablas');
        return res.json({ ok: true, ranchos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const getRancho = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const rancho = await Rancho.findById(uid).populate('tablas');
        return res.json({ ok: true, rancho });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const insertRancho = async (req = request, res = response) => {
    try {
        const tablas = req.body.tablas;
        let ids = [];
        if (tablas instanceof Array) {
            ids = await Promise.all(tablas.map(async (i) => {
                const tabla = new Tabla(i);
                await tabla.save();
                return tabla._id
            }));
        }
        const rancho = new Rancho({
            ...req.body,
            tablas: ids,
        });
        rancho.save()
            .then(rancho => Tabla.populate(rancho, { path: 'tablas' }))
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
    const tablasActuales = JSON.parse(res.getHeader('tablas'));
    let tablasNuevas = req.body.tablas;
    tablasActuales.forEach(async (tabla) => {
        if (!tablasNuevas.find(i => i._id.toString() == tabla.toString()))
            await Tabla.findByIdAndRemove(tabla);
    });
    tablasNuevas = await Promise.all(tablasNuevas.map(async (tabla) => {
        if (tabla._id)
            return await Tabla.findByIdAndUpdate(tabla._id, tabla, { new: true });
        const newTabla = new Tabla(tabla);
        await newTabla.save();
        return newTabla;
    }));
    Rancho.findByIdAndUpdate(uid, { ...req.body, tablas: tablasNuevas }, { new: true })
        .then(rancho => Tabla.populate(rancho, { path: 'tablas' }))
        .then(rancho => res.json({ ok: true, rancho }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al actualizar el rancho',
            });
        });
}

const deleteRancho = (req = request, res = response) => {
    const { uid } = req.params;
    const tablasActuales = JSON.parse(res.getHeader('tablas'));
    tablasActuales.forEach(async (tabla) => await Tabla.findByIdAndRemove(tabla));
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