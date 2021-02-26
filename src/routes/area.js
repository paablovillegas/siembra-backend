const { Router } = require("express");
const { getAreas, getArea, insertArea, updateArea, deleteArea } = require("../controllers/area");

const router = Router();

router.get('/', getAreas);

router.get('/:uid', getArea);

router.post('/', insertArea);

router.put('/:uid', updateArea);

router.delete('/:uid', deleteArea);


module.exports = router;