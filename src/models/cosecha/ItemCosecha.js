const { Schema } = require("mongoose");

const ItemCosechaSchema = new Schema({
    cuadrilla: {
        type: String,
        required: true,
    },
    costos: {
        type: Map,
        of: Number,
    },
});

module.exports = ItemCosechaSchema;