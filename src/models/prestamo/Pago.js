const { Schema, model } = require("mongoose");

const PagoSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
    },
    pago: {
        type: Number,
        required: true,
    },
});

module.exports = PagoSchema;