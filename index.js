// Uso De express y definición del puerto
const express = require("express");
const app = express();
const port = process.env.port || 3014;

// Datos de conexión con Atlas MongoDB Mongoose
// https://data.mongodb-api.com/app/data-frkwh/endpoint/data/v1
const mongoose = require("mongoose");
const userpass = "adrieduian";
const mongoAtlasUri = `mongodb+srv://${userpass}:${userpass}@tpdb.7ut31tp.mongodb.net/test`;
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

// AppError Requerimiento
const AppError = require("./controllers/AppError")

// CORS
const cors = require("cors"); 

// Uses
app.use(cors());
acho
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
  return mongoose.connect(mongoAtlasUri);
}

// Levantamos servidor, comprobamos conexión con Mongoose y MySql
app.listen(port, async () => {
  console.log(`\n--------------------------------------\n`);
  console.log(`Escuchando en http://localhost:${port}`);
  console.log(`\n--------------------------------------\n`);
  try {
    console.log(`\n--------------------------------------\n`);
    console.log("...Conectando con MongoDB Atlas...");
    console.log(`\n--------------------------------------\n`);
    await conectarMongoDB()
      .then(function () {
        console.log(`\n--------------------------------------\n`);
        console.log("Conectado con MongoDB Atlas...");
        console.log(`\n--------------------------------------\n`);
        conexionMongoDB = true;
      })
      .catch(function (err) {
        console.log(`Error al conectar con Atlas MongoDB. Desc: ${err}`);
        process.exit(0);
      });
  } catch (err) {
    console.log(`CATCH:: Error al conectar con Atlas MongoDB. Desc: ${err}`);
    process.exit(0);
  }
  try {
    console.log(`\n--------------------------------------\n`);
    console.log("...Conectando con MySql FreeSQLdataBase...");
    console.log(`\n--------------------------------------\n`);

    dbConnMySQL.establishConexion();

    conexionMySqlDB = true;
    setTimeout(() => {
      console.log(`\n<<<<<<<<<<<<<<<-------->>>>>>>>>>>>>>>\n`);
      console.log(`\n<<<<<<<<<<------------------>>>>>>>>>>\n`);
      console.log(`\n<<<<<------ Happy Hacking! ------>>>>>\n`);
      console.log(`\n<<<<<<<<<<------------------>>>>>>>>>>\n`);
      console.log(`\n<<<<<<<<<<<<<<<-------->>>>>>>>>>>>>>>\n`);
    }, "1997");
  } catch (err) {
    console.log(`CATCH:: Error al conectar con MySql FreeSQLdataBase. Desc: ${err}`);
    process.exit(0);
  }
});
