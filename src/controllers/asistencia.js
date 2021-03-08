const { request, response } = require("express");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { getStartDay, parseDate } = require("../helpers/dates");
const AsistenciaLugar = require("../models/asistencia/AsistenciaLugar");
const LugarTrabajo = require("../models/LugarTrabajo");
const Trabajador = require("../models/Trabajador");

const getAsistencias = async (req = request, res = response) => {
    try {
        const asistencias = await AsistenciaLugar.find().populate([
            {path: 'rancho lugarTrabajo', select: ' -tablas'},
            {path: 'lugar_trabajo', select: '-trabajadores'},
        ]);
        return res.json({ ok: true, asistencias });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const getAsistencia = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const asistencia = LugarTrabajo.findById(uid);
        return res.json({ ok: true, asistencia });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const insertAsistencia = async (req = request, res = response) => {
    const { trabajador: uid } = req.body;
    try {
        let trabajador = await Trabajador.aggregate([
            { $match: { '_id': ObjectId(uid) } },
            {
                $set: {
                    sueldo: '$salario.sueldo',
                    extra: '$salario.extra',
                    bono: '$salario.bono',
                }
            },
            { $unset: ['salario', 'fecha_alta', '__v'] }
        ]);
        if (!trabajador.length)
            return res.status(400).json({ ok: false, msg: 'Trabajador no existente!' });
        trabajador = trabajador[0];
        const lugar = await LugarTrabajo
            .findOne({ 'trabajadores': ObjectId(uid) })
            .select('lugar');
        if (!lugar)
            return res.status(400).json({ ok: false, msg: 'Grupo no existente!' });
        let asistencia_lugar = await AsistenciaLugar.findOne({
            "lugar_trabajo": lugar._id,
            "fecha": getStartDay(req.body.entrada),
        });
        if (!asistencia_lugar) {
            asistencia_lugar = new AsistenciaLugar({
                lugar_trabajo: lugar._id,
                rancho: req.body.rancho, //TODO: Cambiar
                fecha: getStartDay(req.body.entrada),
            });
            await asistencia_lugar.save();
        }
        const yaExistente = asistencia_lugar.trabajadores
            .some(i => i.trabajador._id.toString() == trabajador._id.toString());
        const nuevo_trabajador = {
            trabajador,
            asistencia: {
                credencial: req.body.credencial,
                entrada: parseDate(req.body.entrada),
            }
        };
        if (!yaExistente) {
            asistencia_lugar.trabajadores = [
                ...asistencia_lugar.trabajadores,
                nuevo_trabajador,
            ];
            await asistencia_lugar.save();
        }
        return res.json({ ok: true, asistencia_lugar });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false });
    }
}

const updateAsistencia = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let asistencia = await AsistenciaLugar
            .findOneAndUpdate(
                { 'trabajadores.asistencia._id': ObjectId(uid) },
                { $set: { "trabajadores.$.asistencia.salida": parseDate(req.body.salida) } },
                { new: true }
            );
        if (!asistencia)
            return res.status(400).json({
                ok: false,
                msg: 'Asistencia no existente !',
            });
        res.json({ ok: true, asistencia: asistencia.trabajadores });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteAsistencia = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Asistencia.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Asistencia no registrada !'
                    });
                res.json({ ok: true });
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    getAsistencias,
    getAsistencia,
    insertAsistencia,
    updateAsistencia,
    deleteAsistencia,
};