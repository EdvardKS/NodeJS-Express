const logger = require("../logger")

function writteErrorLog(BD,err){
    
    logger.error.info(`Error al conectar con ${BD}. Desc: ${err}`);

    setTimeout(() => {
        // hacer unaintegración y enviarlo a otro sitio para que no siga pintando el código
        process.exit(0);
      }, "1997");
}

module.exports = writteErrorLog