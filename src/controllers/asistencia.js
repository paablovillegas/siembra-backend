const { request, response } = require("express")

const getAsistencias = async (req = request, res = response) => {
    try {
        const asistencias = Asistencia.find();
        return res.status(200)({ ok: true, asistencias });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getAsistencia = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const asistencia = Asistencia.findById(uid);
        return res.status(200)({ ok: true, asistencia });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertAsistencia = async (req = request, res = response) => {
    try {
        let asistencia = await Asistencia.findOne();
        if (asistencia)
            return res.status(400).json({
                ok: false,
                msg: 'asistencia existente !'
            });
        asistencia = new Asistencia({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await asistencia.save();
        res.status(200).json({ ok: true, asistencia });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateAsistencia = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let asistencia = await Asistencia.findById(uid);
        if (!asistencia)
            return res.status(400).json({
                ok: false,
                msg: 'Asistencia no existente !'
            });
        asistencia = await Asistencia.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, asistencia });
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
    getAsistencias,
    getAsistencia,
    insertAsistencia,
    updateAsistencia,
    deleteAsistencia,
};