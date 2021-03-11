const { request, response } = require("express");
const Actividad = require("../models/Actividad");
const AsistenciaLugar = require("../models/asistencia/AsistenciaLugar");
const LugarTrabajo = require("../models/LugarTrabajo");
const Rancho = require("../models/Rancho");
const Tabla = require("../models/Tabla");
const Trabajador = require("../models/Trabajador");

const validateURL = async (req = request, res = response, next) => {
    const { uid } = req.params;
    if (!uid)
        return res.status(400).json({ ok: false });
    try {
        const asistencia = await AsistenciaLugar.findById(uid);
        if (!asistencia)
            return res.status(400).json({
                ok: false,
                msg: 'Asistencia no existente'
            });
        //res.setHeader('trabajadores', JSON.stringify(asistencia.trabajadores));
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

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
        .then(asistencia => Rancho.populate(
            asistencia,
            { path: 'rancho', select: '-tablas' }
        ))
        .then(asistencia => LugarTrabajo.populate(
            asistencia,
            { path: 'lugar_trabajo', select: '-trabajadores -fletes' }
        ))
        .then(asistencia => Trabajador.populate(
            asistencia,
            { path: 'trabajadores.trabajador' }
        ))
        .then(asistencia => Actividad.populate(
            asistencia,
            { path: 'trabajadores.asistencia.actividades.actividad' }
        ))
        .then(asistencia => Actividad.populate(
            asistencia,
            { path: 'trabajadores.extras.actividades.actividad' }
        ))
        .then(asistencia => Tabla.populate(
            asistencia,
            { path: 'trabajadores.extras.actividades.tablas'}
        ))
        .then(asistencia => Actividad.populate(
            asistencia,
            { path: 'trabajadores.bonos.actividades.actividad' }
        ))
        .then(asistencia => Tabla.populate(
            asistencia,
            { path: 'trabajadores.bonos.actividades.tablas'}
        ))
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