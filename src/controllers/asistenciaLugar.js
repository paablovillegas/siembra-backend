const { request, response } = require("express");
const AsistenciaLugar = require("../models/asistencia/AsistenciaLugar");
const LugarTrabajo = require("../models/LugarTrabajo");
const Rancho = require("../models/Rancho");

const validateURL = (req = request, res = response, next) => { }

const getAsistenciasLugar = async (req = request, res = response) => {
    try {
        AsistenciaLugar.find()
            .then(asistencia => Rancho.populate(
                asistencia,
                { path: 'rancho', select: '-tablas' }
            ))
            .then(asistencia => LugarTrabajo.populate(
                asistencia,
                { path: 'lugar_trabajo', select: '-trabajadores -fletes' }
            ))
            .then(asistencias => res.json({ ok: true, asistencias }));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}
const getAsistenciaLugar = (req = request, res = response) => { }

const insertAsistenciaLugar = async (req = request, res = response) => {
    const asistencia = new AsistenciaLugar(req.body)
    asistencia.save()
        .then(asistencia => Rancho.populate(
            asistencia,
            { path: 'rancho', select: '-tablas' }
        ))
        .then(asistencia => LugarTrabajo.populate(
            asistencia,
            { path: 'lugar_trabajo', select: '-trabajadores -fletes' }
        ))
        .then(asistencias => res.json({ ok: true, asistencias }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al insertar las asistencias',
            });
        });
}

const updateAsistenciaLugar = async (req = request, res = response) => {
    const { uid } = req.params;
    AsistenciaLugar.findByIdAndUpdate(uid, req.body, { new: true })
        .then(asistencia => Rancho.populate(asistencia, { path: 'rancho' }))
        .then(asistencia => LugarTrabajo.populate(asistencia, { path: 'lugar_trabajo' }))
        .then(asistencia => res.json({ ok: true, asistencia }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al actualizar las asistencias',
            });
        });
}

const deleteAsistenciaLugar = (req = request, res = response) => { }

module.exports = {
    validateURL,
    getAsistenciasLugar,
    getAsistenciaLugar,
    insertAsistenciaLugar,
    updateAsistenciaLugar,
    deleteAsistenciaLugar,
}