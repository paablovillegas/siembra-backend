const { Schema, model } = require("mongoose");

const TrabajadorSchema = new Schema({
    nombres: {
        type: String,
        required: true,
    },
    apellido_paterno: {
        type: String,
        required: true,
    },
    apellido_materno: {
        type: String,
    },
    nss: {
        type: String,
    },
    curp: {
        type: String,
    },
    rfc: {
        type: String,
    },
    genero: {
        type: Number,
    },
    estado_civil: {
        type: String,
    },
    domicilio: {
        type: String,
    },
    fecha_alta: {
        type: Date,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
    },
    salario: {
        type: Map,
    },
    evidencias: {
        type: Map,
    },
});

module.exports = new model('Trabajador', TrabajadorSchema, 'trabajadores');