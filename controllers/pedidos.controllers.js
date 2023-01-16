const Pedido = require("../models/pedido.model")

//Rutas
/* ------- CRUD de Moongose - Pedidos -------- */

//Buscar todos
exports.buscarTodos = async function(req,res){
    await Pedido.buscarTodos(function(err,pedidos){
        if(err){
            res.send(err)
        }else{
            res.send(pedidos)            
        }   
    })
}

//Buscar por id
exports.buscarId = async function(req,res){
    const { id } = req.params
    
    await Pedido.buscarId(id,function(err,pedido){
        if(err){
            res.send(err)
        }else{            
            res.send(pedido)            
        } 
    })
}


//Crear pedido
exports.crear = async function(req,res){
    const newPedido = new Pedido(req.body)
    await Pedido.crear(newPedido,function(err,pedido){
        if(err){
            res.send(err)
        }else{
            console.log(pedido)
            res.send(pedido)            
        } 
    })
}

//Actualizar Pedido
exports.actualizar = async function(req,res){
    const pedido = new Pedido(req.body)
    const { id } = req.params
    await Pedido.actualizar(id,pedido,function(err,pedido_updated){
        if(err){
            res.send(err)
        }else{
            console.log(pedido_updated)
            res.send(pedido_updated)            
        } 
    })
}

//Borrar Pedido
exports.borrar = async function(req,res){
    const { id } = req.params
    Pedido.borrar(id,function(err,pedido_deleted){
        if(err){
            res.send(err)
        }else{
            console.log(pedido_deleted)
            res.send(pedido_deleted)            
        }
    })
}