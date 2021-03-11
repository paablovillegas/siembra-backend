const { Schema } = require("mongoose");

const ActividadSchema = new Schema({
    actividad: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    tablas: {
        type: [Schema.Types.ObjectId],
        default: undefined,
    },
});

module.exports = ActividadSchema;