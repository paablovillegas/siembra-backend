const { Schema } = require("mongoose");

const ActividadSchema = new Schema({
    actividad: {
        type: String,
        required: true,
    }
});

module.exports = ActividadSchema;