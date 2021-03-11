const { Schema } = require("mongoose");
const ActividadSchema = require("./ActividadSchema");

const ExtraSchema = new Schema({
    horas: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    actividades: {
        type: [ActividadSchema],
    },
});

module.exports = ExtraSchema;