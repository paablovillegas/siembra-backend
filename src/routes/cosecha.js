const { Router } = require("express");

const router = Router();

router.get('/', getCosecha);
router.get('/:uid', getCosecha);
router.post('/', insertCosecha);
router.put('/:uid', updateCosecha);
router.delete('/:uid', deleteCosecha);

module.exports = router;