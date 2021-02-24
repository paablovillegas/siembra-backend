const { Schema } = require("mongoose");

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
    },
});

module.exports = TablaSchema;