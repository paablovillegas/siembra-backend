const { Schema, model } = require("mongoose");
const ActividadSchema = require("./Actividad");

const AreaSchema = new Schema({
    area: {
        type: String,
        required: true,
        unique: true,
    },
    actividades: [ActividadSchema],
});

module.exports = model('Area', AreaSchema);