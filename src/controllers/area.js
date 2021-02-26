const { request, response } = require("express");
const Area = require("../models/area/Area");

const getAreas = async (req = request, res = response) => {
    try {
        const areas = await Area.find();
        return res.json({ ok: true, areas });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

const getArea = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const area = await Area.findById(uid);
        return res.json({ ok: true, area });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

const insertArea = async (req = request, res = response) => {
    try {
        const area = new Area(req.body);
        await area.save();
        return res.json({ ok: true, area });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

const updateArea = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const area = await Area
            .findByIdAndUpdate(uid, { ...req.body }, { new: true });
        return res.json({ ok: true, area });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

const deleteArea = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        await Area.findByIdAndDelete(uid);
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    getAreas,
    getArea,
    insertArea,
    updateArea,
    deleteArea,
}