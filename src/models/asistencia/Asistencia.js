const { Schema } = require("mongoose");
const BonoSchema = require("./Bono");
const ExtraSchema = require("./Extra");
const TrabajadorAsistenciaSchema = require("./TrabajadorAsistencia");

const AsistenciaSchema = new Schema({
    trabajador: {
        type: TrabajadorAsistenciaSchema,
        required: true,
    },
    asistencia: {
        type: AsistenciaTrabajadorSchema,
    },
    extras: [ExtraSchema],
    bonos: [BonoSchema],
    descuentos: [DescuentoSchema],
});

module.exports = AsistenciaSchema;