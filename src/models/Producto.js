const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
    producto: {
        type: String,
        required: true,
    },
});

module.exports = model('Producto', ProductoSchema);