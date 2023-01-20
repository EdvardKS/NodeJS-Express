const mongoose = require("mongoose");
const logger = require("../logger"); //npm i log4js
let wrapAsync = require("../middlewares/wrapAsync.mw");
let emptyResult = require("../middlewares/emptyResult.mw");

const pedidoSchema = new mongoose.Schema({
  numero_pedido: {
    type: Number,
    required: true,
    min: 0,
    max: 999,
  },
  tipo_entrega: {
    //True para llevar y False para local
    type: Boolean,
    required: true,
  },
  h_entrada: {
    type: Date,
    required: true,
  },
  h_entrega: {
    type: Date,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
    minlength: 9,
    maxlength: 12,
  },
  cliente: {
    type: String,
    required: false,
  },
  pedido: {
    type: Array,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["espera", "proceso", "listo", "entregado", "cancelado"],
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

Pedido.buscarTodos = wrapAsync(async function (result) {
  let resultado;
  try {
    let pedidos = await Pedido.find();
    resultado = JSON.parse(JSON.stringify(pedidos));
    emptyResult(resultado)
    result(null, resultado);
  } catch (err) {
    result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en pedidos.model :: ${err} :: JSON-> ${resultado}`)), null);
    logger.error.error(`"codError":"500" :: Ha ocurrido un Error en pedidos.model All :: ${err} :: JSON-> ${resultado}`);
  }
})

Pedido.buscarId = wrapAsync(async function (id, result) {
  let resultado;
  try {
    let pedido = await Pedido.findById(id);
    resultado = JSON.parse(JSON.stringify(pedido));
    emptyResult(resultado)
    result(null, resultado);
  } catch (err) {
    result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en pedidos.model :: ${err} :: JSON-> ${resultado}`)), null);
    logger.error.error(`"codError":"500" :: Ha ocurrido un Error en pedidos.model By ID :: ${err} :: JSON-> ${resultado}`);
  }
})

Pedido.crear = wrapAsync(async function (newPedido, result) {
  //TODO Me salta este catch
  let resultado;
  try {
    let pedido = await newPedido.save();
    resultado = JSON.parse(JSON.stringify(pedido));
    emptyResult(resultado)
    result(null, resultado);
  } catch (err) {
    result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en pedidos.model CREATE :: ${err} :: JSON-> ${resultado}`)), null);
    logger.error.error(`"codError":"500" :: Ha ocurrido un Error en pedidos.model CREATE :: ${err} :: JSON-> ${resultado}`);
  }
})

Pedido.actualizar = wrapAsync(async function (id, pedido, result) {
  let resultado;
  try {
    let pedido_updated = await Pedido.findByIdAndUpdate(id, pedido, { runValidators: true, new: true });
    resultado = JSON.parse(JSON.stringify(pedido_updated));
    emptyResult(resultado)
    result(null, resultado);
  } catch (err) {
    result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en pedidos.model UPDATE :: ${err} :: JSON-> ${resultado}`)), null);
    logger.error.error(`"codError":"500" :: Ha ocurrido un Error en pedidos.model UPDATE :: ${err} :: JSON-> ${resultado}`);
  }
})

Pedido.borrar = wrapAsync(async function (id, result) {
  let resultado;
  try {
    let pedido = await Pedido.findByIdAndDelete(id);
    resultado = JSON.parse(JSON.stringify(pedido));
    emptyResult(resultado)
    result(null, resultado);
  } catch (err) {
    result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en pedidos.model DELETE :: ${err} :: JSON-> ${resultado}`)), null);
    logger.error.error(`"codError":"500" :: Ha ocurrido un Error en pedidos.model DELETE :: ${err} :: JSON-> ${resultado}`);
  }
})

module.exports = Pedido;