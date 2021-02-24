const { Schema, model } = require("mongoose");
const AsistenciaSchema = require("./Asistencia");

const AsistenciaLugarSchema = new Schema({
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
    trabajadores: [AsistenciaSchema]
});

module.exports = new model(
    'AsistenciaLugar',
    AsistenciaLugarSchema,
    'Asistencias_Lugar',
);