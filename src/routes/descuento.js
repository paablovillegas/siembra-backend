const { Router } = require("express");

const router = Router();

router.get('/', getDescuento);
router.get('/:uid', getDescuento);
router.post('/', insertDescuento);
router.put('/:uid', updateDescuento);
router.delete('/:uid', deleteDescuento);

module.exports = router;