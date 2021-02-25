const { request, response } = require("express")

const getLugar_Trabajos = async (req = request, res = response) => {
    try {
        const lugar_trabajos = Lugar_Trabajo.find();
        return res.status(200)({ ok: true, lugar_trabajos });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getLugar_Trabajo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const lugar_trabajo = Lugar_Trabajo.findById(uid);
        return res.status(200)({ ok: true, lugar_trabajo });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertLugar_Trabajo = async (req = request, res = response) => {
    try {
        let lugar_trabajo = await Lugar_Trabajo.findOne();
        if (lugar_trabajo)
            return res.status(400).json({
                ok: false,
                msg: 'lugar_trabajo existente !'
            });
        lugar_trabajo = new Lugar_Trabajo({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await lugar_trabajo.save();
        res.status(200).json({ ok: true, lugar_trabajo });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateLugar_Trabajo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let lugar_trabajo = await Lugar_Trabajo.findById(uid);
        if (!lugar_trabajo)
            return res.status(400).json({
                ok: false,
                msg: 'Lugar_Trabajo no existente !'
            });
        lugar_trabajo = await Lugar_Trabajo.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, lugar_trabajo });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteLugar_Trabajo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Lugar_Trabajo.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Lugar_Trabajo no registrada !'
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
    getLugar_Trabajos,
    getLugar_Trabajo,
    insertLugar_Trabajo,
    updateLugar_Trabajo,
    deleteLugar_Trabajo,
};