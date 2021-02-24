const { Schema } = require("mongoose");

const TrabajadorAsistenciaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    }, 
    salario: {
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