const { Schema, model } = require("mongoose");

const CicloSchema = new Schema({
    ciclo: {
        type: String,
        required: true,
    },
    tabla: {
        type: Schema.Types.ObjectId,
        ref: 'Tabla',
        required: true,
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_siembra: {
        type: Date,
    },
    fecha_cosecha: {
        type: Date,
    },
    fecha_fin: {
        type: Date,
    },
});

module.exports = model('Ciclo', CicloSchema);