const { Router } = require("express");
const { getTablas, getTabla, insertTabla, updateTabla, deleteTabla } = require("../controllers/tabla");

const router = Router();

router.get('/:rid', getTablas);
router.post('/:rid', insertTabla);
router.put('/:uid', updateTabla);
router.delete('/:uid', deleteTabla);

module.exports = router;