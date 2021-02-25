const { request, response } = require("express")

const getbono = async (req = request, res = response) => {
    try {
        const bono = Bono.find();
        return res.status(200)({ ok: true, bono });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getBono = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const bono = Bono.findById(uid);
        return res.status(200)({ ok: true, bono });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertBono = async (req = request, res = response) => {
    try {
        let bono = await Bono.findOne();
        if (bono)
            return res.status(400).json({
                ok: false,
                msg: 'bono existente !'
            });
        bono = new Bono({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await bono.save();
        res.status(200).json({ ok: true, bono });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateBono = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let bono = await Bono.findById(uid);
        if (!bono)
            return res.status(400).json({
                ok: false,
                msg: 'Bono no existente !'
            });
        bono = await Bono.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, bono });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteBono = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Bono.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Bono no registrada !'
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
    getbono,
    getBono,
    insertBono,
    updateBono,
    deleteBono,
};