const { Schema, model } = require("mongoose");
const PagoSchema = require("./Pago");

const PrestamoSchema = new Schema({
    trabajador: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    pagos: [PagoSchema],
});

module.exports = model('Producto', PrestamoSchema);