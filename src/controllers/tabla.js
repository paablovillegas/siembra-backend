const { request, response } = require("express");
const mongoose = require('mongoose');
const Rancho = require("../models/rancho/Rancho");

const getTablas = async (req = request, res = response) => {
    const { rid } = req.params;
    try {
        const tablas = await Rancho.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(rid) } },
            { $unwind: '$tablas' },
            { $set: { rid: '$_id', } },
            { $unset: ['alias', 'hectareas', '_id', '__v'] },
            {
                $set: {
                    _id: '$tablas._id',
                    hectareas: '$tablas.hectareas',
                    libre: '$tablas.libre',
                    tabla: '$tablas.tabla',
                },
            },
            { $unset: 'tablas' },
        ]);
        return res.json({ ok: true, tablas })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}
const getTabla = async (req = request, res = response) => {
    const { uid, rid } = req.params;
    try {
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
    res.json({ ok: true });
}

const insertTabla = async (req = request, res = response) => {
    const { rid } = req.params;
    try {
        let rancho = await Rancho.findById(rid);
        rancho.tablas = [...rancho.tablas, { ...req.body }];
        rancho.save();
        rancho = await Rancho.findById(rid);
        return res.json({ ok: true, rancho });

    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}
const updateTabla = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const rancho = await Rancho.findOneAndUpdate(
            { 'tablas._id': mongoose.Types.ObjectId(uid) },
            { $set: { 'tablas.$': { ...req.body } } },
            { new: true },
        );
        return res.status(200).json({ ok: true, rancho });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false });
    }
}
const deleteTabla = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const rancho = await Rancho.findOneAndUpdate(
            { 'tablas._id': mongoose.Types.ObjectId(uid) },
            { $pull: { tablas: { _id: mongoose.Types.ObjectId(uid) } } },
            { new: true },
        );
        return res.status(200).json({ ok: true, rancho });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    getTablas,
    getTabla,
    insertTabla,
    updateTabla,
    deleteTabla,
}