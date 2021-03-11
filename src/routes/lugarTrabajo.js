const { Router } = require("express");
const {
    validateURL,
    getLugaresTrabajo,
    getLugarTrabajo,
    insertLugarTrabajo,
    updateLugarTrabajo,
    deleteLugarTrabajo
} = require("../controllers/lugarTrabajo");

const router = Router();

router.get('/', getLugaresTrabajo);
router.get('/:uid', validateURL, getLugarTrabajo);
router.post('/', insertLugarTrabajo);
router.put('/:uid', validateURL, updateLugarTrabajo);
router.delete('/:uid', validateURL, deleteLugarTrabajo);

module.exports = router;