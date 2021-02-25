const { Router } = require("express");

const router = Router();

router.get('/', getLugar_trabajo);
router.get('/:uid', getLugar_trabajo);
router.post('/', insertLugar_trabajo);
router.put('/:uid', updateLugar_trabajo);
router.delete('/:uid', deleteLugar_trabajo);

module.exports = router;