const mongoose = require("mongoose") 

const pedidoSchema = new mongoose.Schema({
    numero_pedido:{
        type:Number,
        required: true,
        min:0,
        max:999
    },
    tipo_entrega:{//True para llevar y False para local
        type:Boolean,
        required:true
    },
    h_entrada:{
        type:Date,
        required: true
    },
    h_entrega:{
        type:Date,
        required:true
    },
    telefono:{
        type:Number,
        required:true,
        minlength:9,
        maxlength:12
    },
    cliente:{
        type:String,
        required:false,
    },
    pedido:{
        type:Array,
        required:true
    },
    estado:{
        type:String,
        required:true,
        lowercase:true,
        enum:['espera', 'proceso', 'listo', 'entregado', 'cancelado']
    }
})

const Pedido = mongoose.model("Pedido", pedidoSchema)



Pedido.buscarTodos = async function(result){
    try{       
        let pedidos = await Pedido.find()
        
        let resultado = JSON.parse(JSON.stringify(pedidos))
        result(null,resultado)       
    } catch(err){
        result(JSON.parse(JSON.stringify(`{ "codError":"500", "desc":"${err}" }`)),null)     
    }    
}

Pedido.buscarId = async function(id, result){
    try{       
        let pedido = await Pedido.findById(id)
        let resultado = JSON.parse(JSON.stringify(pedido))
        result(null,resultado)
    } catch(err){
        result(JSON.parse(JSON.stringify(`{ "codError":"500", "desc":"${err}" }`)),null)     
    }    
}

Pedido.crear = async function(newPedido,result){
    //TODO Me salta este catch
    try{       
        let pedido = await newPedido.save()
        let resultado = JSON.parse(JSON.stringify(pedido))
        result(null,resultado)
    } catch(err){
        result(JSON.parse(JSON.stringify(`{ "codError":"500", "desc":"${err}" }`)),null)     
    }
}

Pedido.actualizar = async function(id,pedido,result){
    try{       
        let pedido_updated = await Pedido.findByIdAndUpdate(id,pedido,{ runValidators:true, new:true})
        let resultado = JSON.parse(JSON.stringify(pedido_updated))
        result(null,resultado)
    } catch(err){
        result(JSON.parse(JSON.stringify(`{ "codError":"500", "desc":"${err}" }`)),null)     
    }
}

Pedido.borrar = async function(id,result){
    try{       
        let pedido = await Pedido.findByIdAndDelete(id)
        let resultado = JSON.parse(JSON.stringify(pedido))
        result(null,resultado)
    } catch(err){
        result(JSON.parse(JSON.stringify(`{ "codError":"500", "desc":"${err}" }`)),null)     
    }
}








module.exports = Pedido