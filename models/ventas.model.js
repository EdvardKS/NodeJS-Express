const logger = require("../logger"); //npm i log4js
let wrapAsync = require("../middlewares/wrapAsync.mw");
const dbConn = require("../conf/db.config")
let emptyResult = require("../middlewares/emptyResult.mw");


let Ventas = function(venta){
    this.id_mongoose = pedido.id_mongoose,  //Varchar(30)
    this.h_entrada = pedido.h_entrada,      //DATETIME
    this.h_entrega = pedido.h_entrega,      //DATETIME
    this.estado = pedido.estado,            //Varchar(50)
    this.tipo_entrega = pedido.tipo_entrega,//Es boolean pero SQL te lo pone como tinyINT
    this.telefono = pedido.telefono,        //int(11)
    this.cliente = pedido.cliente           //varchar(50)
}


// #region FIND ALL
Ventas.findAllVentas = wrapAsync(async function(result){
    const sql = "select * from ventas" 
    dbConn.query(sql, function(err,res){
        if(err){
            result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en estadisticas.model All :: ${err} :: JSON-> ${resultado}`)), null);
            logger.error.error(`"codError":"500" :: Ha ocurrido un Error en estadisticas.model All :: ${err} :: JSON-> ${resultado}`); 
            result(err,null)
        }else{
            emptyResult(res)
            result(null,res)
        }        
    })
})

// #endregion

//#region FIND BY ID
Ventas.findByIdVentas = wrapAsync(async function(id,result){
    const sql = "select * from ventas where id_num_pedido = ?"
    dbConn.query(sql,id,function(err,res){
        if(err){
            result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en estadisticas.model By ID :: ${err} :: JSON-> ${resultado}`)), null);
            logger.error.error(`"codError":"500" :: Ha ocurrido un Error en estadisticas.model By ID :: ${err} :: JSON-> ${resultado}`); 
            result(err,null)
        }else{
            emptyResult(res)
            result(null,res)
        } 
    })
})

// #endregion

// #region CREATE
Ventas.createVentas = wrapAsync(async function(newVenta,result){
    const sql = "INSERT INTO ventas SET ?"
    dbConn.query(sql,newVenta,function(err,res){
        if(err){
            result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en estadisticas.model CREATE :: ${err} :: JSON-> ${resultado}`)), null);
            logger.error.error(`"codError":"500" :: Ha ocurrido un Error en estadisticas.model CREATE :: ${err} :: JSON-> ${resultado}`); 
            result(err,null)
        }else{
            emptyResult(res)
            const idInserted = res.insertId
            result(null,{idInserted}) 
        }
    })
})
// #endregion

// #region UPDATE
Ventas.updateVentas = wrapAsync(async function(id,venta,result){
    const sql = "UPDATE ventas SET ? WHERE id_num_pedido=?"
    dbConn.query(sql,[venta,id],function(err,res){
        if(err){
            result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en estadisticas.model UPDATE :: ${err} :: JSON-> ${resultado}`)), null);
            logger.error.error(`"codError":"500" :: Ha ocurrido un Error en estadisticas.model UPDATE :: ${err} :: JSON-> ${resultado}`); 
            result(err,null)
        }else{
            result(null,res)
        }
    })
})
// #endregion

// #region DELETE
Ventas.deleteVentas = wrapAsync(async function(id,result){
    const sql = "DELETE FROM ventas WHERE id_num_pedido=?"
    dbConn.query(sql,id,function(err,res){
        if(err){
            result(JSON.parse(JSON.stringify(`Ha ocurrido un Error en estadisticas.model By ID :: ${err} :: JSON-> ${resultado}`)), null);
            logger.error.error(`"codError":"500" :: Ha ocurrido un Error en estadisticas.model By ID :: ${err} :: JSON-> ${resultado}`); 
            result(err,null)
        }else{
            result(null,res)
        }
    })
})
// #endregion



module.exports = Ventas