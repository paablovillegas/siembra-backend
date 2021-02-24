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

/*
    lugar_trabajo: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    rancho: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    flete: {
        type: Number,
    },
    fecha: {
        type: Date,
        required: true,
    },
    trabajapdores: {
        type: []
    }
 */