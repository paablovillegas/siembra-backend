const { Router } = require("express");
const { getActividades, getActividad, insertActividad, updateActividad, deleteActividad } = require("../controllers/actividad");

const router = Router();

router.get('/:aid', getActividades);

router.post('/:aid', insertActividad);

router.put('/:uid', updateActividad);

router.delete('/:uid', deleteActividad);

module.exports = router;