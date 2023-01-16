const pedidoController = require("../controllers/pedidos.controllers");
const express = require("express");
const router = express.Router();

//Obtener todos los pedidos
router.get("/", pedidoController.buscarTodos);
//Obtener un padido por ID
router.get("/:id", pedidoController.buscarId);
//Crear un Pedido
router.post("/", pedidoController.crear);
//Actualizar un pedido
router.put("/:id", pedidoController.actualizar);
//Eliminar pedido
router.delete("/:id", pedidoController.borrar);

module.exports = router;