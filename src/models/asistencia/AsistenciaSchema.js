const { Schema } = require("mongoose");
const AsistenciaTrabajadorSchema = require("./AsistenciaTrabajador");
const BonoSchema = require("./Bono");
const DescuentoSchema = require("./Descuento");
const ExtraSchema = require("./Extra");
const TrabajadorAsistenciaSchema = require("./TrabajadorAsistencia");

const AsistenciaSchema = new Schema({
    trabajador: {
        type: Schema.Types.ObjectId,
        ref: 'Trabajador',
        required: true,
    },
    asistencia: {
        type: AsistenciaTrabajadorSchema,
        required: true,
    },
    extras: [ExtraSchema],
    bonos: [BonoSchema],
    descuentos: [DescuentoSchema],
});

module.exports = AsistenciaSchema;