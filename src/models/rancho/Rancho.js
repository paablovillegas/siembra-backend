const { Schema, model } = require("mongoose");
const TablaSchema = require("./Tabla");

const RanchoSchema = new Schema({
    rancho: {
        type: String,
        required: true,
    },
    hectareas: {
        type: Number,
    },
    alias: {
        type: String,
    },
    tablas: {
        type: [TablaSchema],
        required: true,
        default: [],
    }
});

module.exports = model('Rancho', RanchoSchema);