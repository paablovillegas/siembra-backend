const { request, response } = require("express")

const getCosechas = async (req = request, res = response) => {
    try {
        const cosechas = Cosecha.find();
        return res.json({ ok: true, cosechas });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const getCosecha = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const cosecha = Cosecha.findById(uid);
        return res.json({ ok: true, cosecha });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const insertCosecha = async (req = request, res = response) => {
    try {
        let cosecha = await Cosecha.findOne();
        if (cosecha)
            return res.status(400).json({
                ok: false,
                msg: 'cosecha existente !'
            });
        cosecha = new Cosecha({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await cosecha.save();
        res.json({ ok: true, cosecha });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const updateCosecha = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let cosecha = await Cosecha.findById(uid);
        if (!cosecha)
            return res.status(400).json({
                ok: false,
                msg: 'Cosecha no existente !'
            });
        cosecha = await Cosecha.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.json({ ok: true, cosecha });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

const deleteCosecha = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Cosecha.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Cosecha no registrada !'
                    });
                res.json({ ok: true });
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false });
    }
}

module.exports = {
    getCosechas,
    getCosecha,
    insertCosecha,
    updateCosecha,
    deleteCosecha,
};