const Pedido = require("../models/pedido.model");
let wrapAsync = require("../middlewares/wrapAsync.mw");
const logger = require("../logger");


//Rutas
/* ------- CRUD de Moongose - Pedidos -------- */

//Buscar todos
exports.buscarTodos = wrapAsync(async function (req, res) {
  await Pedido.buscarTodos(function (err, pedidos) {
    if (err) {
      logger.error.info(
        `Ha ocurrido un Error buscando todos los pedidos :: ${err}`
      );
      res.send(err);
    } else {
      res.cookie('pedidos', req.data, { signed: true });
      logger.access.info("Se han buscado todos los pedidos");
      res.send(pedidos);
    }
  });
});

//Buscar por id
exports.buscarId = async function (req, res) {
  const { id } = req.params;
  await Pedido.buscarId(id, function (err, pedido) {
    if (err) {
      logger.error.info(`Ha ocurrido un Error buscando el pedido con ID: ${id} :: ${err}`);
      res.send(err);
    } else {
      logger.access.info("Se ha buscado el pedido con id: " + id);
      res.send(pedido);
    }
  });
};

//Crear pedido
exports.crear = async function (req, res) {
  const newPedido = new Pedido(req.body);

  await Pedido.crear(newPedido, function (err, pedido) {
    if (err) {
      logger.error.info(
        `Ha ocurrido un Error creando el pedido: ${newPedido} :: ${err}`
      );
      res.send(err);
    } else {
      logger.access.info("Se ha insertado un nuevo pedido: " + newPedido);
      res.send(pedido);
    }
  });
};

//Actualizar Pedido
exports.actualizar = async function (req, res) {
  const pedido = new Pedido(req.body);
  const { id } = req.params;
  await Pedido.actualizar(id, pedido, function (err, pedido_updated) {
    if (err) {
      logger.error.info(
        `Ha ocurrido un Error actualizando el pedido con ID: ${id} :: Los nuevos datos son: ${pedido} :: ${err}`
      );
      res.send(err);
    } else {
      logger.access.info(
        "Se ha actualizado el pedido con id: " +
          id +
          "\n Con los siguientes datos: " +
          pedido
      );
      res.send(pedido_updated);
    }
  });
};

//Borrar Pedido
exports.borrar = wrapAsync(async function (req, res) {
    const { id } = req.params
    Pedido.borrar(id, function (err, pedido_deleted) {
        if (err) {
            logger.error.error(`Ha ocurrido un Error borrando el pedido con ID: ${id} :: ${err}`)
            res.send(err)
        } else {
            console.log(pedido_deleted)
            if (pedido_deleted == null) {
                logger.error.info(`Ha ocurrido un Error borrando el pedido con ID: ${id}`)
            } else {
                logger.access.info("Se ha borrado el pedido con id: " + id)
                res.send(pedido_deleted)
            }
        }
    })
})
