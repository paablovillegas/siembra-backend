const { Router } = require("express");

const router = Router();

router.get('/', getProducto);
router.get('/:uid', getProducto);
router.post('/', insertProducto);
router.put('/:uid', updateProducto);
router.delete('/:uid', deleteProducto);

module.exports = router;