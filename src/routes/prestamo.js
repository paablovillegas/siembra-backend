const { Router } = require("express");

const router = Router();

router.get('/', getPrestamo);
router.get('/:uid', getPrestamo);
router.post('/', insertPrestamo);
router.put('/:uid', updatePrestamo);
router.delete('/:uid', deletePrestamo);

module.exports = router;