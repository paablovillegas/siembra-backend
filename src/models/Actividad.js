const { Schema, model } = require("mongoose");

const ActividadSchema = new Schema({
    actividad: {
        type: String,
        required: true,
    }
});

module.exports = model('Actividad', ActividadSchema, 'actividades');