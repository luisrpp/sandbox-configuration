/**
 * Config decorators
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */
var model = require("./model.js");

exports.define = function(route, method, viewFunction, mockConfiguration) {
    if (!(mockConfiguration === undefined)) {
        state.configFunctionDefined = state.configFunctionDefined || []

        if (_.indexOf(state.configFunctionDefined, route + '_' + method) < 0) {
            model.saveCustomRoute(route, method, mockConfiguration);
            state.configFunctionDefined.push(route + '_' + method);
        }
    }

    Sandbox.define(route, method, model.getConfigForRoute(route, method), viewFunction);
}
