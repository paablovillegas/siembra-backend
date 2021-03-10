const { Schema, model } = require("mongoose");

const TablaSchema = new Schema({
    tabla: {
        type: String,
        required: true,
    },
    hectareas: {
        type: Number,
    },
    libre: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = model('Tabla', TablaSchema);