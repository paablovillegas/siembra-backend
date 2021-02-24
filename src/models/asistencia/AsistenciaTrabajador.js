const { Schema } = require("mongoose");
const ActividadSchema = require("./ActividadSchema");

const AsistenciaTrabajadorSchema = new Schema({
    credencial: {
        type: String,
        required: true,
    },
    entrada: {
        type: Date,
        required: true,
    },
    salida: {
        type: Date,
    },
    actividades: {
        type: [ActividadSchema],
        required: true,
    },
});

module.exports = AsistenciaTrabajadorSchema;