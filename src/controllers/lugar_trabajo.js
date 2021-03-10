const { request, response } = require("express");
const LugarTrabajo = require("../models/LugarTrabajo");

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
    try {
        const lugar_trabajo = await LugarTrabajo
            .findByIdAndUpdate(uid, req.body, { new: true });
        res.json({ ok: true, lugar_trabajo });
    } catch (err) {
        res.status(500).json({ ok: false });
    }
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
    getLugaresTrabajo,
    getLugarTrabajo,
    insertLugarTrabajo,
    updateLugarTrabajo,
    deleteLugarTrabajo,
}