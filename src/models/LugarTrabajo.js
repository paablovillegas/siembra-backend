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
    fletes: [Map],
    trabajadores: [{
        type: Schema.Types.ObjectId,
        ref: 'Trabajador',
    }],
});

module.exports = new model(
    'LugarTrabajo',
    LugarTrabajoSchema,
    'Lugares_Trabajo',
);