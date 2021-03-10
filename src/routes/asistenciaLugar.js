const { Router } = require("express");
const { getAsistenciaLugar, insertAsistenciaLugar } = require("../controllers/asistenciaLugar");

const router = Router();

router.get('/', getAsistenciaLugar);

router.post('/', insertAsistenciaLugar);

module.exports = router;