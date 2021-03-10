const { Schema, model } = require("mongoose");

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
    tablas: [{
        type: Schema.Types.ObjectId,
        ref: 'Tabla'
    }]
});

module.exports = model('Rancho', RanchoSchema);