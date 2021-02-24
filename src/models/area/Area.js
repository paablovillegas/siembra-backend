const { Schema, model } = require("mongoose");
const Actividad = require("./Actividad");

const AreaSchema = new Schema({
    area: {
        type: String,
        required: true,
    },
    actividades: {
        type: [Actividad],
        required: true,
        default: [],
    }
});

module.exports = model('Area', AreaSchema);