const { Router } = require("express");

const router = Router();

router.get('/', getCiclo);
router.get('/:uid', getCiclo);
router.post('/', insertCiclo);
router.put('/:uid', updateCiclo);
router.delete('/:uid', deleteCiclo);

module.exports = router;