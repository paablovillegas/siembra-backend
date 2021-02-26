const { Router } = require("express");
const { getLugaresTrabajo, getLugarTrabajo, insertLugarTrabajo, updateLugarTrabajo, deleteLugarTrabajo } = require("../controllers/lugar_trabajo");

const router = Router();

router.get('/', getLugaresTrabajo);
router.get('/:uid', getLugarTrabajo);
router.post('/', insertLugarTrabajo);
router.put('/:uid', updateLugarTrabajo);
router.delete('/:uid', deleteLugarTrabajo);

module.exports = router;