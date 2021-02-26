const { request, response } = require("express");
const mongoose = require('mongoose');
const Area = require("../models/area/Area");

const getActividades = async (req = request, res = response) => {
    const { aid } = req.params;
    try {
        const actividades = await Area.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(aid) } },
            { $unwind: '$actividades' },
            { $set: { aid: '$_id' } },
            { $unset: ['area', '_id', '__v'] },
            {
                $set: {
                    _id: '$actividades._id',
                    actividad: '$actividades.actividad',
                },
            },
            { $unset: 'actividades' },
        ]);
        return res.json({ ok: true, actividades });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const insertActividad = async (req = request, res = response) => {
    const { aid } = req.params;
    try {
        const area = await Area
            .findByIdAndUpdate(
                aid,
                { $push: { actividades: { ...req.body } } },
                { new: true },
            );
        return res.json({ ok: true, area });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}
const updateActividad = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const area = await Area.findOneAndUpdate(
            { 'actividades._id': mongoose.Types.ObjectId(uid) },
            { $set: { 'actividades.$': req.body } },
            { new: true },
        );
        return res.json({ ok: true, area });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}
const deleteActividad = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const area = await Area.findOneAndUpdate(
            { 'actividades._id': mongoose.Types.ObjectId(uid) },
            { $pull: { actividades: { _id: mongoose.Types.ObjectId(uid) } } },
            { new: true },
        );
        return res.json({ ok: true, area });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    getActividades,
    insertActividad,
    updateActividad,
    deleteActividad,
}