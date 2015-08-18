/**
 * Failures
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */

// Imports
var model = require("./model.js");


exports.activate = function(req, errorFunction) {
    var config = model.getConfigForRoute(req.path, req.method);

    if (config) {
        var failurePercentage = config.failurePercentage;

        var rand = Math.floor(Math.random() * 100);

        if (failurePercentage > rand) {
            errorFunction();
        }
    }
}
