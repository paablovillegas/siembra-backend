const { Router } = require("express");

const router = Router();

router.get('/', getTrabajador);
router.get('/:uid', getTrabajador);
router.post('/', insertTrabajador);
router.put('/:uid', updateTrabajador);
router.delete('/:uid', deleteTrabajador);

module.exports = router;