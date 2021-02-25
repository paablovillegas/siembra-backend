const { request, response } = require("express")

const getProductos = async (req = request, res = response) => {
    try {
        const productos = Producto.find();
        return res.status(200)({ ok: true, productos });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const getProducto = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const producto = Producto.findById(uid);
        return res.status(200)({ ok: true, producto });
    } catch (err) {
        console.log(err);
        return res.status(500)({ ok: false });
    }
};

const insertProducto = async (req = request, res = response) => {
    try {
        let producto = await Producto.findOne();
        if (producto)
            return res.status(400).json({
                ok: false,
                msg: 'producto existente !'
            });
        producto = new Producto({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await producto.save();
        res.status(200).json({ ok: true, producto });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateProducto = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let producto = await Producto.findById(uid);
        if (!producto)
            return res.status(400).json({
                ok: false,
                msg: 'Producto no existente !'
            });
        producto = await Producto.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, producto });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteProducto = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Producto.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Producto no registrada !'
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
    getProductos,
    getProducto,
    insertProducto,
    updateProducto,
    deleteProducto,
};