const { Schema, model } = require("mongoose");

const AreaSchema = new Schema({
    area: {
        type: String,
        required: true,
        unique: true,
    },
    actividades: [{
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        
    }],
});

module.exports = model('Area', AreaSchema);