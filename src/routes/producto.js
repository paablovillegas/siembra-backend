const { Router } = require("express");
const { getProductos, getProducto, deleteProducto, insertProducto, updateProducto } = require("../controllers/producto");

const router = Router();

router.get('/', getProductos);
router.get('/:uid', getProducto);
router.post('/', insertProducto);
router.put('/:uid', updateProducto);
router.delete('/:uid', deleteProducto);

module.exports = router;