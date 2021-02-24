const { Schema } = require("mongoose");

const DescuentoSchema = new Schema({
    cantidad: {
        type: Number,
        required: true,
    },
    motivo: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    autorizacion: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = DescuentoSchema;