const { request, response } = require("express")

const getTrabajadors = async (req = request, res = response) => {
    try {
        const trabajadores = Trabajador.find();
        return res.status(200)({ ok: true, trabajadores });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getTrabajador = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const trabajador = Trabajador.findById(uid);
        return res.status(200)({ ok: true, trabajador });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertTrabajador = async (req = request, res = response) => {
    try {
        let trabajador = await Trabajador.findOne();
        if (trabajador)
            return res.status(400).json({
                ok: false,
                msg: 'trabajador existente !'
            });
        trabajador = new Trabajador({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await trabajador.save();
        res.status(200).json({ ok: true, trabajador });
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
        res.status(200).json({ ok: true, trabajador });
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
                        msg: 'Trabajador no registrada !'
                    });
                res.status(200).json({ ok: true });
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