const { request, response } = require("express")

const getExtras = async (req = request, res = response) => {
    try {
        const extras = Extra.find();
        return res.json({ ok: true, extras });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const getExtra = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const extra = Extra.findById(uid);
        return res.json({ ok: true, extra });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const insertExtra = async (req = request, res = response) => {
    try {
        let extra = await Extra.findOne();
        if (extra)
            return res.status(400).json({
                ok: false,
                msg: 'extra existente !'
            });
        extra = new Extra({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await extra.save();
        res.json({ ok: true, extra });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateExtra = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let extra = await Extra.findById(uid);
        if (!extra)
            return res.status(400).json({
                ok: false,
                msg: 'Extra no existente !'
            });
        extra = await Extra.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.json({ ok: true, extra });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteExtra = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Extra.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Extra no registrada !'
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
    getExtras,
    getExtra,
    insertExtra,
    updateExtra,
    deleteExtra,
};