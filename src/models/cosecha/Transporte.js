const { Schema } = require("mongoose");

const TransporteSchema = new Schema({
    chofer: {
        type: String,
        required: true,
    },
    placas: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
});

module.exports = TransporteSchema;