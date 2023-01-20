const estadisticasController = require("../controllers/estadisticas.controllers");
const express = require("express");
const router = express.Router();

//Obtener todos los est 
router.get("/ventas",estadisticasController.findAllVentas);
//Obtener todos un est por ID
router.get("/ventas/:id", estadisticasController.findByIdVentas);
//Crear  
router.post("/ventas", estadisticasController.createVentas);
//Actualizar
router.put("/ventas/:id", estadisticasController.updateVentas);
//Eliminar
router.delete("/ventas/:id", estadisticasController.deleteVentas);

module.exports = router;