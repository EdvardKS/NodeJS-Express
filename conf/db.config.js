const { connect } = require("http2");
const AppErrorConection = require("../controllers/AppErrorConection");
const mysql = require("mysql"); //npm i mysql

// Host: sql7.freemysqlhosting.net
// Database name: sql7586932
// Database user: sql7586932
// Database password: RaSRP7TxIV
// Port number: 3306

const dbConn2 = mysql.createConnection({
  host: "ivmmlvwedvardb97.mysql.db",
  user: "ivmmlvwedvardb97",
  password: "SX515wifi",
  database: "ivmmlvwedvardb97",
});


const dbConn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "estadisticas",
})

//Si no establece la conexión, tumbará el servidor


module.exports = dbConn;
