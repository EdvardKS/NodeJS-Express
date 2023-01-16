const logger = require("../logger"); //npm i log4js
const fs = require("fs");

class AppErrorConection extends Error{
    constructor(message,status){
        super()
        this.message = message
        this.status = status

        logger.error.fatal("Error en la connectividad con :: "+this.message+" :: "+this.status);
        setTimeout(() => {
            process.exit(0);
        }, "1997");
    }
    
}

module.exports = AppErrorConection