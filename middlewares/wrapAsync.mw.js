const logger = require("../logger")

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e => {
            logger.error.info(`Error atravesando wrapAsync :: ${e}`);
            next(e)
        })
    }
}

module.exports = wrapAsync()