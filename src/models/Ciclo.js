const { Schema, model } = require("mongoose");
const TablaSchema = require("./rancho/Tabla");

const CicloSchema = new Schema({
    ciclo: {
        type: String,
        required: true,
    },
    rancho: {
        type: Schema.Types.ObjectId,
        ref: 'Rancho',
        required: true,
    },
    tabla: {
        type: TablaSchema,
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
        required: true,
    },
    fecha_cosecha: {
        type: Date,
        required: true,
    },
    fecha_fin: {
        type: Date,
        required: true,
    },
});

module.exports = model('Area', CicloSchema);