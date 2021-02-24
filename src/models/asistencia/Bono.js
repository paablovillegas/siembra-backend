const { Schema } = require("mongoose");
const ActividadSchema = require("./ActividadSchema");

const BonoSchema = new Schema({
    total: {
        type: Number,
        required: true,
    },
    actividades: {
        type: [ActividadSchema],
    },
});

module.exports = BonoSchema;
