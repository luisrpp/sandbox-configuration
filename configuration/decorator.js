/**
 * Config decorator
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

    Sandbox.define(route, method, function(req, res) {
        try {
            // Fails based on the mock configuration.
            _applyAction(req, _fail);

            // Applies a timeout on the request based on the mock configuration.
            _applyAction(req, _sleep);

            viewFunction(req, res);
        } catch (e) {
            res.status(e.code);
            res.type('application/json');
            return res.json(e);
        }
    });
}

var _applyAction = function(req, actionFn) {
    var config = model.getConfigForRoute(req.path, req.method);

    if (config) {
        var rand = Math.floor(Math.random() * 100);

        actionFn(req, config, rand);
    }
}

var _fail = function(req, config, rand) {
    var failurePercentage = config.failurePercentage;

    if (failurePercentage > rand) {
        throw({ code: 500, message: "Internal server error" });
    }
}

var _sleep = function(req, config, rand) {
    var timeoutPercentage = config.timeoutPercentage;

    if (timeoutPercentage > rand) {
        req.sleep(config.timeout);
    }
}
