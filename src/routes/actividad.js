const { Router } = require("express");
const { getActividads, getActividad, insertActividad, updateActividad, deleteActividad } = require("../controllers/actividad");

const router = Router();

router.get('/', getActividads);
router.get('/:uid', getActividad);
router.post('/', insertActividad);
router.put('/:uid', updateActividad);
router.delete('/:uid', deleteActividad);

module.exports = router;