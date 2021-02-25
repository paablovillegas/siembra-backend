const { request, response } = require("express")

const getPrestamos = async (req = request, res = response) => {
    try {
        const prestamos = Prestamo.find();
        return res.status(200)({ ok: true, prestamos });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getPrestamo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const prestamo = Prestamo.findById(uid);
        return res.status(200)({ ok: true, prestamo });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertPrestamo = async (req = request, res = response) => {
    try {
        let prestamo = await Prestamo.findOne();
        if (prestamo)
            return res.status(400).json({
                ok: false,
                msg: 'prestamo existente !'
            });
        prestamo = new Prestamo({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await prestamo.save();
        res.status(200).json({ ok: true, prestamo });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updatePrestamo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let prestamo = await Prestamo.findById(uid);
        if (!prestamo)
            return res.status(400).json({
                ok: false,
                msg: 'Prestamo no existente !'
            });
        prestamo = await Prestamo.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, prestamo });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deletePrestamo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Prestamo.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Prestamo no registrada !'
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
    getPrestamos,
    getPrestamo,
    insertPrestamo,
    updatePrestamo,
    deletePrestamo,
};