const { Schema, model } = require("mongoose");
const CicloCosechaSchema = require("./CicloCosecha");
const InocuidadSchema = require("./Inocuidad");
const TransporteSchema = require("./Transporte");

const CosechaSchema = new Schema({
    folio: {
        type: Number,
        required: true,
    },
    destino: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    fecha_salida: {
        type: Date,
        required: true,
    },
    transporte: {
        type: TransporteSchema,
        required: true,
    },
    inocuidad: {
        type: InocuidadSchema,
    },
    tipo: {
        type: String,
        enum: ['Nacional', 'Importacion'],
        required: true,
    },
    ciclos: [CicloCosechaSchema],
});

module.exports = new model('Cosecha', CosechaSchema);