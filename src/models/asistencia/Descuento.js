const { Schema } = require("mongoose");

const DescuentoSchema = new Schema({
    total: {
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
    },
});

module.exports = DescuentoSchema;