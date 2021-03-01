const { Router } = require("express");
const { getTrabajadores, getTrabajador, insertTrabajador, updateTrabajador, deleteTrabajador } = require("../controllers/trabajador");

const router = Router();

router.get('/', getTrabajadores);
router.get('/:uid', getTrabajador);
router.post('/', insertTrabajador);
router.put('/:uid', updateTrabajador);
router.delete('/:uid', deleteTrabajador);

module.exports = router;