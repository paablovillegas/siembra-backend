const { Schema } = require("mongoose");
const ItemCosechaSchema = require("./ItemCosecha");

const CicloCosechaSchema = new Schema({
    ciclo: {
        type: String,
        required: true,
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },
    corte: [ItemCosechaSchema],
    empaque: [ItemCosechaSchema],
    granel: [ItemCosechaSchema],
});

module.exports = CicloCosechaSchema;