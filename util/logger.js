const path = require('path')
const bunyan = require('bunyan')
const process = require('process')

module.exports = {
  getLogger: function () {
    debugger
    let callerPath = _getCallerFile()
    let relativePath = path.relative(process.cwd(), callerPath)
    let logger = bunyan.createLogger({ name: relativePath })
    return logger
  }
}

function _getCallerFile() {
  var originalFunc = Error.prepareStackTrace;

  var callerfile;
  try {
    var err = new Error();
    var currentfile;

    Error.prepareStackTrace = function (err, stack) { return stack; };

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();

      if (currentfile !== callerfile) break;
    }
  } catch (e) { }

  Error.prepareStackTrace = originalFunc;

  return callerfile;
}
