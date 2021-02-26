const { Router } = require("express");
const { getRanchos, getRancho, insertRancho, updateRancho, deleteRancho, validateURL } = require("../controllers/rancho");

const router = Router();

router.get('/', getRanchos);
router.get('/:uid', validateURL, getRancho);
router.post('/', insertRancho);
router.put('/:uid', validateURL, updateRancho);
router.delete('/:uid', validateURL, deleteRancho);

module.exports = router;