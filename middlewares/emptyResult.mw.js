const logger = require("../logger");

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
  }

function emptyResult(json, err) {
  if (isEmpty(json)) {
    logger.error.info(`Error 404 los datos devueltos son " ${json} ". Desc: ${err} Empty`);
  }
}

module.exports = emptyResult;
