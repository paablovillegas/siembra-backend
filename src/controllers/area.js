const { request, response } = require("express");
const Area = require("../models/Area");
const Actividad = require("../models/Actividad");

const validateURL = async (req = request, res = response, next) => {
    const { uid } = req.params;
    if (!uid)
        return res.status(400).json({ ok: false });
    try {
        const area = await Area.findById(uid);
        if (!area)
            return res.status(400).json({
                ok: false,
                msg: 'Área no existente'
            });
        res.setHeader('actividades', JSON.stringify(area.actividades));
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const getAreas = async (req = request, res = response) => {
    try {
        const areas = await Area.find().populate('actividades');
        return res.json({ ok: true, areas });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const getArea = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const area = await Area.findById(uid).populate('actividades');
        return res.json({ ok: true, area });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const insertArea = async (req = request, res = response) => {
    const actividades = req.body.actividades || [];
    let ids = [];
    if (actividades instanceof Array) {
        ids = await Promise.all(actividades.map(async (i) => {
            const actividad = new Actividad(i);
            await actividad.save();
            return actividad._id
        }));
    }
    const area = new Area({ ...req.body, actividades: ids });
    area.save()
        .then(area => Actividad.populate(area, { path: 'actividades' }))
        .then(area => res.json({ ok: true, area }))
        .catch(async (err) => {
            await ids.forEach(async (actividad) =>
                await Actividad.findByIdAndRemove(actividad)
            );
            console.log(err);
            res.status(400).json({ ok: false, msg: 'Error al crear el area' });
        });
}

const updateArea = async (req = request, res = response) => {
    const { uid } = req.params;
    const actividadesActuales = JSON.parse(res.getHeader('actividades'));
    let actividadesNuevas = req.body.actividades;
    if (actividadesNuevas instanceof Array) {
        actividadesActuales.forEach(async (actividad) => {
            if (!actividadesNuevas.find(i => (i._id || '').toString() == actividad.toString()))
                await Actividad.findByIdAndRemove(actividad);
        });
        actividadesNuevas = await Promise.all(actividadesNuevas.map(async (actividad) => {
            if (actividad._id)
                return await Actividad.findByIdAndUpdate(actividad._id, actividad, { new: true });
            const newActividad = new Actividad(actividad);
            await newActividad.save();
            return newActividad;
        }));
    }
    Area.findByIdAndUpdate(uid, { ...req.body, actividades: actividadesNuevas }, { new: true })
        .then(area => Actividad.populate(area, { path: 'actividades' }))
        .then(area => res.json({ ok: true, area }))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                ok: false,
                msg: 'Error al actualizar el area',
            });
        });
}

const deleteArea = async (req = request, res = response) => {
    const { uid } = req.params;
    const actividadesActuales = JSON.parse(res.getHeader('actividades'));
    actividadesActuales.forEach(async (actividad) => await Actividad.findByIdAndRemove(actividad));
    try {
        await Area.findByIdAndDelete(uid);
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    validateURL,
    getAreas,
    getArea,
    insertArea,
    updateArea,
    deleteArea,
}