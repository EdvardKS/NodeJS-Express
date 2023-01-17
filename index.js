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
  app.use(methodOverride("_method"));


  // CORS
  const cors = require("cors");
  app.use(cors());
  
  // Control de Errores Requerimiento
  const AppErrorConection = require("./controllers/AppErrorConection");
  const AppError = require("./controllers/AppError")
  let {wrapAsync} = require("./middlewares/wrapAsync.mw")
  
  //Morgan
  const morgan = require("morgan");
  
  // Uses
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
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
    logger.access.info("Se ha intentado establecer conexion")
    console.log("...Conectando con MongoDB Atlas... \n");
    await conectarMongoDB()
      .then(function () {
        console.log("Conectado con MongoDB Atlas...\n\n");
        conexionMongoDB = true;
        logger.access.debug("Conexion establecida con MongoDB")
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
          logger.access.debug("Conexion establecida con MySQL")
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
