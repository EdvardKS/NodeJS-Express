const mongoose = require("mongoose")
// const userpass = "adrieduian";
// const mongoAtlasUri = `mongodb+srv://${userpass}:${userpass}@tpdb.7ut31tp.mongodb.net/test`;
const mongoDB = `mongodb://127.0.0.1:27017/telepiPedidos_BD`;
const Pedido = require("./models/pedido.model")

mongoose.connect(mongoDB)
.then(()=>{
    console.log("Mongoose is connected")
})
.catch((err)=>{
    console.log(err)
})

const pedidos = [
    {
      numero_pedido: 2,
      h_entrada: "2022-06-02T20:12",
      h_entrega: "2022-06-02T21:00",
      telefono: 965389541,
      tipo_entrega: true,
      cliente: "",
      pedido:[
        {
          tipo:"pizza",
          nombre:"Carbonara",
          tamaño:"familiar",
          masa:"fina",
          ingredientes:"Aqui va un listado de Strings con cada ingrediente",
          comentario:"La quiero bien echa"
        },
        {
          tipo:"bebida",
          nombre: "coca-cola",
          tamaño: "1l",
          cantidad:"1"
        }
      ],
      estado: "proceso",
    },
    {
      numero_pedido: 4,
      h_entrada: "2022-12-08T18:00",
      h_entrega: "2022-12-08T18:30",
      telefono: 965389540,
      tipo_entrega: false,
      cliente: "Alfonso García Carrillo",
      pedido:[
        {
          tipo:"pizza",
          nombre:"Gourmet Carne",
          tamaño:"mediana",
          masa:"clasica",
          ingredientes:"Aqui va un listado de Strings con cada ingrediente",
          comentario:"La quiero bien echa"
        },
        {
          tipo:"complemento",
          nombre: "alitas",
          cantidad:"2"
        },
        {
          tipo:"complemento",
          nombre: "pizzolinos peperoni",
          cantidad:"1"
        }
        
      ],
      estado: "entregado",
    },
  ];
  

Pedido.insertMany(pedidos)
.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})
