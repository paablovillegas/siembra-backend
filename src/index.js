const fileUpload = require('express-fileupload');
// const passport = require('passport');
const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');
require('dayjs/locale/es');
require('dotenv').config();

const { definePrototypes } = require('./helpers/prototypes');
const { dbConnection } = require('./database/config');
// const jwtAuth = require('./middlewares/passport');
const logger = require('./helpers/logger');

//Dates en español
dayjs.locale('es');
//Add prototypes
definePrototypes();

//Express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//JSON Parse
app.use(express.json());

//Passport middleware
/*
app.use(passport.initialize());
jwtAuth(passport);
*/

//File Upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
}));

app.get('/prueba', (req, res) => {
    res.json({ ok: true });
});

app.use('/siembra/ranchos', require('./routes/rancho'));
app.use('/siembra/areas', require('./routes/area'));
app.use('/siembra/productos', require('./routes/producto'));
app.use('/siembra/ciclos', require('./routes/ciclo'));
app.use('/siembra/lugares_trabajo', require('./routes/lugarTrabajo'));
app.use('/siembra/asistencias_lugar', require('./routes/asistenciaLugar'));
app.use('/siembra/cosechas', require('./routes/cosecha'));

const { PORT } = process.env;
app.listen(PORT, () => {
    logger.info(`Servidor levantado ${PORT}`);
});