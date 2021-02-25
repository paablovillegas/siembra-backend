const { request, response } = require("express")

const getDescuentos = async (req = request, res = response) => {
    try {
        const descuentos = Descuento.find();
        return res.status(200)({ ok: true, descuentos });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getDescuento = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const descuento = Descuento.findById(uid);
        return res.status(200)({ ok: true, descuento });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertDescuento = async (req = request, res = response) => {
    try {
        let descuento = await Descuento.findOne();
        if (descuento)
            return res.status(400).json({
                ok: false,
                msg: 'descuento existente !'
            });
        descuento = new Descuento({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await descuento.save();
        res.status(200).json({ ok: true, descuento });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateDescuento = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let descuento = await Descuento.findById(uid);
        if (!descuento)
            return res.status(400).json({
                ok: false,
                msg: 'Descuento no existente !'
            });
        descuento = await Descuento.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, descuento });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteDescuento = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Descuento.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Descuento no registrada !'
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
    getDescuentos,
    getDescuento,
    insertDescuento,
    updateDescuento,
    deleteDescuento,
};