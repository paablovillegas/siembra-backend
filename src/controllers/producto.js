const { request, response } = require("express");
const Producto = require("../models/Producto");

const getProductos = async (req = request, res = response) => {
    try {
        const productos = await Producto.find();
        return res.json({ ok: true, productos });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const getProducto = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const producto = await Producto.findById(uid);
        return res.json({ ok: true, producto });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const insertProducto = async (req = request, res = response) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.json({ ok: true, producto });
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
        const producto = await Producto
            .findByIdAndUpdate(uid, req.body, { new: true });
        res.json({ ok: true, producto });
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
                        msg: 'Producto no registrado'
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
    getProductos,
    getProducto,
    insertProducto,
    updateProducto,
    deleteProducto,
};