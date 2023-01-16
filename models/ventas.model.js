
const dbConn = require("../conf/db.config")

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
Ventas.findAllVentas = async function(result){
    const sql = "select * from ventas" 
    dbConn.query(sql, function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }        
    })
}

// #endregion

//#region FIND BY ID
Ventas.findByIdVentas = async function(id,result){
    const sql = "select * from ventas where id_num_pedido = ?"
    dbConn.query(sql,id,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        } 
    })
}

// #endregion

// #region CREATE
Ventas.createVentas = async function(newVenta,result){
    const sql = "INSERT INTO ventas SET ?"
    dbConn.query(sql,newVenta,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            console.log(res)
            const idInserted = res.insertId
            result(null,{idInserted}) 
        }
    })
}
// #endregion

// #region UPDATE
Ventas.updateVentas = async function(id,venta,result){
    const sql = "UPDATE ventas SET ? WHERE id_num_pedido=?"
    dbConn.query(sql,[venta,id],function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}
// #endregion

// #region DELETE
Ventas.deleteVentas = async function(id,result){
    const sql = "DELETE FROM ventas WHERE id_num_pedido=?"
    dbConn.query(sql,id,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}
// #endregion



module.exports = Ventas