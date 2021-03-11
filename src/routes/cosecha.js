const { Router } = require("express");
const {
    getCosecha,
    getCosechas,
    insertCosecha,
    updateCosecha,
    deleteCosecha
} = require("../controllers/cosecha");

const router = Router();

router.get('/', getCosechas);
router.get('/:uid', getCosecha);
router.post('/', insertCosecha);
router.put('/:uid', updateCosecha);
router.delete('/:uid', deleteCosecha);

module.exports = router;