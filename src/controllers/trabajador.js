const { request, response } = require("express");
const Trabajador = require("../models/Trabajador");

const getTrabajadores = async (req = request, res = response) => {
    try {
        const trabajadores = await Trabajador.find();
        return res.json({ ok: true, trabajadores });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const getTrabajador = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const trabajador = await Trabajador.findById(uid);
        return res.json({ ok: true, trabajador });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const insertTrabajador = async (req = request, res = response) => {
    try {
        let trabajador = await Trabajador.findOne();
        /*
        if (trabajador)
            return res.status(400).json({
                ok: false,
                msg: 'Trabajador existente !'
            });
        */
        trabajador = new Trabajador({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await trabajador.save();
        res.json({ ok: true, trabajador });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateTrabajador = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let trabajador = await Trabajador.findById(uid);
        if (!trabajador)
            return res.status(400).json({
                ok: false,
                msg: 'Trabajador no existente !'
            });
        trabajador = await Trabajador.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.json({ ok: true, trabajador });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteTrabajador = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Trabajador.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Trabajador no registrado !'
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
    getTrabajadores,
    getTrabajador,
    insertTrabajador,
    updateTrabajador,
    deleteTrabajador,
};