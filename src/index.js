const fileUpload = require('express-fileupload');
const passport = require('passport');
const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');
require('dayjs/locale/es');
require('dotenv').config();

const { definePrototypes } = require('./helpers/prototypes');
const { dbConnection } = require('./database/config');
const jwtAuth = require('./middlewares/passport');
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
app.use(passport.initialize());
jwtAuth(passport);

//File Upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
}));
const { PORT } = process.env;
app.listen(PORT, () => {
    logger.info(`Servidor levantado ${PORT}`);
});