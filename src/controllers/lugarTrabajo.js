const { request, response } = require("express");
const LugarTrabajo = require("../models/LugarTrabajo");
const Trabajador = require("../models/Trabajador");

const validateURL = async (req = request, res = response, next) => {
    const { uid } = req.params;
    if (!uid)
        return res.status(400).json({ ok: false });
    try {
        const lugarTrabajo = await LugarTrabajo.findById(uid);
        if (!lugarTrabajo)
            return res.status(400).json({
                ok: false,
                msg: 'Lugar de trabajo no existente'
            });
        res.setHeader('trabajadores', JSON.stringify(lugarTrabajo.trabajadores));
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const getLugaresTrabajo = async (req = request, res = response) => {
    try {
        let lugares = await LugarTrabajo.find().populate('trabajadores');
        return res.json({ ok: true, lugares });
    } catch (err) {
        console.log(err)
        res.status(500).json({ ok: false });
    }
}

const getLugarTrabajo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let lugar_trabajo = await LugarTrabajo.findById(uid).populate('trabajadores');
        return res.json({ ok: true, lugar_trabajo });
    } catch (err) {
        res.status(500).json({ ok: false });
    }
}

const insertLugarTrabajo = async (req = request, res = response) => {
    try {
        let lugar_trabajo = new LugarTrabajo(req.body);
        await lugar_trabajo.save();
        return res.json({ ok: true, lugar_trabajo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const updateLugarTrabajo = async (req = request, res = response) => {
    const { uid } = req.params;
    const trabajadoresActuales = JSON.parse(res.getHeader('trabajadores'));
    let trabajadoresNuevos = req.body.trabajadores;
    if (trabajadoresNuevos instanceof Array) {
        trabajadoresActuales.forEach(async (trabajador) => {
            if (!trabajadoresNuevos.find(i => (i._id || '').toString() == trabajador.toString()))
                await Trabajador.findByIdAndRemove(trabajador);
        });
        trabajadoresNuevos = await Promise.all(trabajadoresNuevos.map(async (trabajador) => {
            if (trabajador._id)
                return await Trabajador.findByIdAndUpdate(trabajador._id, trabajador, { new: true });
            const newTrabajador = new Trabajador(trabajador);
            await newTrabajador.save();
            return newTrabajador;
        }));
    }
    LugarTrabajo.findByIdAndUpdate(uid, { ...req.body, trabajadores: trabajadoresNuevos || [] }, { new: true })
        .then(area => Trabajador.populate(area, { path: 'trabajadores' }))
        .then(area => res.json({ ok: true, area }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al actualizar el area',
            });
        });
}

const deleteLugarTrabajo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        LugarTrabajo.findByIdAndDelete(uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Lugar Trabajo no registrado'
                    });
                res.json({ ok: true });
            });
    } catch (err) {
        res.status(500).json({ ok: false });
    }
}

module.exports = {
    validateURL,
    getLugaresTrabajo,
    getLugarTrabajo,
    insertLugarTrabajo,
    updateLugarTrabajo,
    deleteLugarTrabajo,
}