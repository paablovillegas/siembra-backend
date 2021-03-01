const { Schema } = require("mongoose");

const TrabajadorAsistenciaSchema = new Schema({
    nombres: {
        type: String,
        required: true,
    }, 
    apellido_paterno: {
        type: String,
        required: true,
    },
    apellido_materno: {
        type: String,
    },
    sueldo: {
        type: Number,
        required: true,
        default: 0,
    }, 
    extra: {
        type: Number,
        required: true,
        default: 0,
    }, 
    bono: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = TrabajadorAsistenciaSchema;