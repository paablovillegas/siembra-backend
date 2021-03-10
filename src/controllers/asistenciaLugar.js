const { request, response } = require("express");
const AsistenciaLugar = require("../models/asistencia/AsistenciaLugar");

const getAsistenciaLugar = async (req = request, res = response) => {
    try {
        const asistencia_lugar = await AsistenciaLugar
            .find()
            .populate([
                { path: 'rancho', select: ' -tablas' },
                { path: 'lugar_trabajo', select: '-trabajadores' },
                { path: 'trabajadores.asistencia.actividades.actividad'}
            ]);
        return res.json({ ok: true, asistencia_lugar });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const insertAsistenciaLugar = async (req = request, res = response) => {
    try {
        const asistencia_lugar = new AsistenciaLugar(req.body);
        await asistencia_lugar.save();
        return res.json({ ok: true, asistencia_lugar });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    getAsistenciaLugar,
    insertAsistenciaLugar,
}