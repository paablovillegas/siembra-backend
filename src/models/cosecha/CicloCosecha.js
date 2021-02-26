const { Schema } = require("mongoose");
const TablaSchema = require("../rancho/Tabla");
const ItemCosechaSchema = require("./ItemCosecha");

const CicloCosechaSchema = new Schema({
    ciclo: {
        type: String,
        required: true,
    },
    tabla: {
        type: TablaSchema,
        required: true,
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_siembra: {
        type: Date,
        required: true,
    },
    fecha_cosecha: {
        type: Date,
        required: true,
    },
    fecha_fin: {
        type: Date,
        required: true,
    },
    corte: [ItemCosechaSchema],
    empaque: [ItemCosechaSchema],
    granel: [ItemCosechaSchema],
});

module.exports = CicloCosechaSchema;