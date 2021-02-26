const { Router } = require("express");
const { getCiclos, getCiclo, insertCiclo, updateCiclo, deleteCiclo } = require("../controllers/ciclo");

const router = Router();

router.get('/', getCiclos);
router.get('/:uid', getCiclo);
router.post('/', insertCiclo);
router.put('/:uid', updateCiclo);
router.delete('/:uid', deleteCiclo);

module.exports = router;