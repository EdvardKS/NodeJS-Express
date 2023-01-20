const Ventas = require("../models/ventas.model")
let wrapAsync = require("../middlewares/wrapAsync.mw")

// #region FIND ALL
exports.findAllVentas = wrapAsync(async function(req,res){
    await Ventas.findAllVentas(function(err,ventas){
        if(err){ 
            logger.error.info(`Ha ocurrido un Error buscando todas las estadisticas :: ${err}`)
            res.send(err)
        }else{
            logger.access.info("Se han buscado todas las estadisticas")
            res.send(ventas)            
        }   
    })
})
// #endregion

// #region FIND BY ID

exports.findByIdVentas = wrapAsync(async function(req,res){
    const { id } = req.params
    await Ventas.findByIdVentas(id,function(err,venta){
        if(err){
            logger.error.info(`Ha ocurrido un Error buscando la estadistica con ID: ${id} :: ${err}`)
            res.send(err)
        }else{            
            logger.access.info("Se ha buscado la estadistica con id: " + id)
            res.send(venta)            
        }  
    })
})

// #endregion

// #region CREATE

exports.createVentas = wrapAsync(async function(req,res){
    const newVenta = new Ventas(req.body)
    await Ventas.createVentas(newVenta,function(err,venta){
        if(err){
            logger.error.info(`Ha ocurrido un Error creando la estadistica: ${newPedido} :: ${err}`)
            res.send(err)
        }else{
            logger.access.info("Se ha insertado un nueva estadistica: " + newPedido)
            res.send(venta)            
        } 
    })
})

// #endregion

// #region UPDATE

exports.updateVentas = wrapAsync(async function(req,res){
    const venta = new Ventas(req.body)
    const { id } = req.params
    await Ventas.updateVentas(id,venta,function(err,venta_updated){
        if(err){
            logger.error.info(`Ha ocurrido un Error actualizando la estadistica con ID: ${id} :: Los nuevos datos son: ${pedido} :: ${err}`)
            res.send(err)
        }else{
            logger.access.info("Se ha actualizado la estadistica con id: " + id + "\n Con los siguientes datos: " + pedido)
            res.send(venta_updated)            
        } 
    })
})

// #endregion

// #region DELETE

exports.deleteVentas = wrapAsync(async function(req,res){
    const { id } = req.params
    Ventas.deleteVentas(id,function(err,venta_delete){
        if(err){
            logger.error.info(`Ha ocurrido un Error borrando la estadistica con ID: ${id} :: ${err}`)
            res.send(err)
        }else{
            logger.access.info("Se ha borrado la estadsitica con id: " + id)
            res.send(venta_delete)            
        }
    })
})

// #endregion