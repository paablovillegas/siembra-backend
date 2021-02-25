const { request, response } = require("express")

const getciclo = async (req = request, res = response) => {
    try {
        const ciclo = Ciclo.find();
        return res.status(200)({ ok: true, ciclo });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getCiclo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const ciclo = Ciclo.findById(uid);
        return res.status(200)({ ok: true, ciclo });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertCiclo = async (req = request, res = response) => {
    try {
        let ciclo = await Ciclo.findOne();
        if (ciclo)
            return res.status(400).json({
                ok: false,
                msg: 'ciclo existente !'
            });
        ciclo = new Ciclo({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await ciclo.save();
        res.status(200).json({ ok: true, ciclo });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateCiclo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let ciclo = await Ciclo.findById(uid);
        if (!ciclo)
            return res.status(400).json({
                ok: false,
                msg: 'Ciclo no existente !'
            });
        ciclo = await Ciclo.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, ciclo });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteCiclo = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Ciclo.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ciclo no registrada !'
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
    getciclo,
    getCiclo,
    insertCiclo,
    updateCiclo,
    deleteCiclo,
};