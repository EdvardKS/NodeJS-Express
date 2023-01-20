// logger
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
  // const mongoDB = `mongodb://127.0.0.1:27017/pedidos`;
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
  app.use(cors());

  // Control de Errores Requerimiento
  const AppErrorConection = require("./controllers/AppErrorConection");
  const AppError = require("./controllers/AppError");

  //Morgan
  const morgan = require("morgan");
  app.use(morgan("combined"));

  // Uses
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(methodOverride("_method"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // COOKIES Y SESIONES
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  const sessionOptions = {
    secret: "passwordforsession",
    proxy: true,
    resave: true,
    saveUninitialized: true,
  };
  app.use(session(sessionOptions));
  app.use(cookieParser("passwordforcookies"));
  // FIN USO DE COOKIES Y SESIONES

  // Indicamos las rutas de las rutas
  app.use(
    `/${version}/pedidos`,
    morgan("combined", {
      stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
    }),
    pedidoRoutes
  );

  app.use(
    `/${version}/est`,
    morgan("combined", {
      stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
    }),
    estadisticasRoutes
  );

  // Conectamos el servidor en la nube de MongoDB Atlas
  async function conectarMongoDB() {
    return mongoose.connect(mongoDB);
  }

  // Levantamos servidor, comprobamos conexión con Mongoose y MySql
  app.listen(port, async () => {
    logger.access.info("Se ha intentado establecer conexion");
    console.log("...Conectando con MongoDB Atlas... \n");

    try {
      dbConnMySQL.connect(function (err) {
        console.log("...Conectando con MySql FreeSQLdataBase...");
        if (err) {
          console.log(`Problema de conexión con MYSQL ${err}`);
          new AppErrorConection("MYSql 1", 500);
        } else {
          conexionMySqlDB = true;
          console.log("...Conectado con MYSql");
          logger.access.debug("Conexion establecida con MySQL");
        }
      });
    } catch (err) {
      throw new AppErrorConection("MYSql 2", 500);
    }

    await conectarMongoDB()
      .then(function () {
        console.log("Conectado con MongoDB Atlas...\n\n");
        conexionMongoDB = true;
        logger.access.debug("Conexion establecida con MongoDB");
      })
      .catch(function (err) {
        throw new AppErrorConection("MongoDB Atlas", 500);
      });

    setTimeout(function () {
      if (conexionMySqlDB && conexionMongoDB) {
        console.log(`\n\n\tEscuchando en el puerto ${port}`);
        console.log("\n\n\t\t ¡Happy Hacking! \n\n");
      } else {
        console.log(`Problemas de conexión :: MongoDB->${conexionMongoDB} :: MySql->${conexionMySqlDB}`);
        logger.error.fatal(`Problemas de conexión :: MongoDB->${conexionMongoDB} :: MySql->${conexionMySqlDB}`);
      }
    }, 1997);
  });
} catch (err) {
  console.log("Ha ocurrido un Error en la línea general del programa.");
  logger.error.fatal(`Ha ocurrido un Error en la línea general del programa. ${err}`);
  setTimeout(() => {
    process.exit(0);
  }, "1997");
}
