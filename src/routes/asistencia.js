const { Router } = require("express");

const router = Router();

router.get('/', getAsistencias);
router.get('/:uid', getAsistencia);
router.post('/', insertAsistencia);
router.put('/:uid', updateAsistencia);
router.delete('/:uid', deleteAsistencia);

module.exports = router;