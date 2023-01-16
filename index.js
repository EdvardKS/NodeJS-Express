// logger
const { writteErrorLog } = require("./middlewares/msg.log.error");
const logger = require("./logger"); //npm i log4js
const fs = require("fs");

try {
  // Uso De express y definición del puerto
  const express = require("express");
  const app = express();
  const port = process.env.port || 3014;

  // Datos de conexión con Atlas MongoDB Mongoose
  // https://data.mongodb-api.com/app/data-frkwh/endpoint/data/v1
  const mongoose = require("mongoose");
  const userpass = "adrieduian";
  const mongoDB = `mongodb+srv://${userpass}:${userpass}@tpdb.7ut31tp.mongodb.net/test`;
  // const mongoDB = `mongodb://127.0.0.1:27017/telepiPedidos_BD`;
  let conexionMongoDB = false;

  // Datos de conexión con MySql
  const dbConnMySQL = require("./conf/db.config");
  let conexionMySqlDB = false;

  // Datos Carpeta Rutas
  const pedidoRoutes = require("./routes/pedidos.routes");
  const estadisticasRoutes = require("./routes/estadisticas.routes");

  // Versión de la App
  const version = "v2";

  // Libreria de sobreescritura
  const methodOverride = require("method-override");


  // CORS
  const cors = require("cors");
  app.use(methodOverride("_method"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const whitelist = ["https://edvardks.com", "localhost:3014"];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback("CORS DENEGA ESTA SOLICITUD");
      }
    },
    optionsSuccessStatus: 204,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false

  };

  app.use(cors(corsOptions));


  // Indicamos las rutas de las rutas
  app.use(`/${version}/pedidos`, pedidoRoutes);
  app.use(`/${version}/est`, estadisticasRoutes);

  // AppErrorConection Requerimiento
  const AppErrorConection = require("./controllers/AppErrorConection");



  //Morgan
  const morgan = require("morgan");

  // Uses

  app.use(methodOverride("_method"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Indicamos las rutas de las rutas
  app.use(`/${version}/pedidos`, pedidoRoutes);
  app.use(`/${version}/est`, estadisticasRoutes);

  //Aceptar BODY en peticiones POST usando JSON
  // app.use(express.urlencoded({extended:true}))
  // app.use(express.json())

  // Conectamos el servidor en la nube de MongoDB Atlas
  async function conectarMongoDB() {
    return mongoose.connect(mongoDB);
  }

  // Levantamos servidor, comprobamos conexión con Mongoose y MySql
  app.listen(port, async () => {
    console.log(`\n\n\n\nEscuchando en el puerto ${port} \n`);

    console.log("...Conectando con MongoDB Atlas... \n");
    await conectarMongoDB()
      .then(function () {
        console.log("Conectado con MongoDB Atlas...\n\n");
        conexionMongoDB = true;
      })
      .catch(function (err) {
        throw new AppErrorConection("MongoDB Atlas", 500);
      });

    try {
      dbConnMySQL.connect(function (err) {
        console.log("...Conectando con MySql FreeSQLdataBase...");
        if (err) {
          console.log(`Problema de conexión con MYSQL ${err}`);
          new AppErrorConection("MYSql 1", 500);
        } else {
          console.log("Conectado con MYSql...");
          conexionMySqlDB = true;
        }
      });
    } catch (err) {
      throw new AppErrorConection("MYSql 2", 500);
    }
  });
} catch (err) {
  console.log("Ha ocurrido un Error en la línea general del programa.");
  logger.error.fatal(
    `Ha ocurrido un Error en la línea general del programa. ${err}`
  );
  setTimeout(() => {
    process.exit(0);
  }, "1997");
}
