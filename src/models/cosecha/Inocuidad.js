const { Schema } = require("mongoose");

const InocuidadSchema = new Schema({
    limpio: {
        type: Boolean,
        required: true,
    },
    mal_olor: {
        type: Boolean,
        required: true,
    },
    cubierto: {
        type: Boolean,
        required: true,
    },
    fuga_aceite: {
        type: Boolean,
        required: true,
    },
    requisitos_cliente: {
        type: Boolean,
        required: true,
    },
    buenas_practicas: {
        type: Boolean,
        required: true,
    },
});

module.exports = InocuidadSchema;