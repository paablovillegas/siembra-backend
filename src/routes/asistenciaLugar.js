const { Router } = require("express");
const {
    validateURL,
    getAsistenciasLugar,
    getAsistenciaLugar,
    insertAsistenciaLugar,
    updateAsistenciaLugar,
    deleteAsistenciaLugar
} = require("../controllers/asistenciaLugar");

const router = Router();

router.get('/', getAsistenciasLugar);

router.get('/:uid', validateURL, getAsistenciaLugar);

router.post('/', insertAsistenciaLugar);

router.put('/:uid', validateURL, updateAsistenciaLugar);

router.delete('/:uid', validateURL, deleteAsistenciaLugar);

module.exports = router;