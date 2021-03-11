const { Schema, model } = require("mongoose");

const LugarTrabajoSchema = new Schema({
    lugar: {
        type: String,
        required: true,
    },
    tipo_lugar: {
        type: String,
        enum: ['Base', 'Cuadrilla', 'Cosecha'],
        required: true,
        default: 'Base',
    },
    fletes: Map,
    trabajadores: [{
        type: Schema.Types.ObjectId,
        ref: 'Trabajador',
    }],
});

module.exports = new model(
    'LugarTrabajo',
    LugarTrabajoSchema,
    'lugares_trabajo',
);