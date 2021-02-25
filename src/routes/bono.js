const { Router } = require("express");

const router = Router();

router.get('/', getBono);
router.get('/:uid', getBono);
router.post('/', insertBono);
router.put('/:uid', updateBono);
router.delete('/:uid', deleteBono);

module.exports = router;