const { Router } = require("express");

const router = Router();

router.get('/', getExtra);
router.get('/:uid', getExtra);
router.post('/', insertExtra);
router.put('/:uid', updateExtra);
router.delete('/:uid', deleteExtra);

module.exports = router;