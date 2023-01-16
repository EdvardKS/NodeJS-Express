const Ventas = require("../models/ventas.model")

// #region FIND ALL
exports.findAllVentas = async function(req,res){
    await Ventas.findAllVentas(function(err,ventas){
        if(err){ 
            res.send(err)
        }else{
            res.send(ventas)            
        }   
    })
}
// #endregion

// #region FIND BY ID

exports.findByIdVentas = async function(req,res){
    const { id } = req.params
    await Ventas.findByIdVentas(id,function(err,venta){
        if(err){
            res.send(err)
        }else{            
            res.send(venta)            
        }  
    })
}

// #endregion

// #region CREATE

exports.createVentas = async function(req,res){
    const newVenta = new Ventas(req.body)
    await Ventas.createVentas(newVenta,function(err,venta){
        if(err){
            res.send(err)
        }else{
            console.log(venta)
            res.send(venta)            
        } 
    })
}

// #endregion

// #region UPDATE

exports.updateVentas = async function(req,res){
    const venta = new Ventas(req.body)
    const { id } = req.params
    await Ventas.updateVentas(id,venta,function(err,venta_updated){
        if(err){
            res.send(err)
        }else{
            console.log(venta_updated)
            res.send(venta_updated)            
        } 
    })
}

// #endregion

// #region DELETE

exports.deleteVentas = async function(req,res){
    const { id } = req.params
    Ventas.deleteVentas(id,function(err,venta_delete){
        if(err){
            res.send(err)
        }else{
            console.log(venta_delete)
            res.send(venta_delete)            
        }
    })
}

// #endregion