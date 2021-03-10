const { Router } = require("express");
const { validateURL, getAreas, getArea, insertArea, updateArea, deleteArea } = require("../controllers/area");

const router = Router();

router.get('/', getAreas);

router.get('/:uid', validateURL, getArea);

router.post('/', insertArea);

router.put('/:uid', validateURL, updateArea);

router.delete('/:uid', validateURL, deleteArea);


module.exports = router;