const { Schema, model } = require("mongoose");

const LugarTrabajoSchema = new Schema({
    lugar: {
        type: String,
        required: true,
    },
    tipo_lugar: {
        type: String,
        enum: ['base', 'cuadrilla', 'cosecha'],
        required: true,
        default: 'base',
    },
    fletes: {
        type: [Object],//TODO: Arreglar
        required: true,
        default: [],
    },
    trabajadores: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: [],
    },
});

module.exports = new model(
    'LugarTrabajo',
    LugarTrabajoSchema,
    'Lugares_Trabajo',
);