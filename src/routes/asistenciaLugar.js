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

router.get('/:uid', getAsistenciaLugar);

router.post('/', insertAsistenciaLugar);

router.put('/:uid', updateAsistenciaLugar);

router.delete('/:uid', deleteAsistenciaLugar);

module.exports = router;