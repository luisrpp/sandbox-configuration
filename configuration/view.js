/**
 * Configuration View
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */

var model = require("./model.js");
var validation = require("./validation.js");


exports.get = function(req, res) {
    res.status('200');
    res.type('text/html');

    res.render('configuration/index', {
        globalConfig: JSON.stringify(model.getGlobalConfigs(), null, 2),
        customConfig: JSON.stringify(model.getCustomConfigs(), null, 2)
    });
}

exports.post = function(req, res) {
    if (req.body.configType === undefined || req.body.configType == 'GLOBAL') {
        updateGlobal(req, res);
    } else {
        updateCustom(req, res);
    }
}

var updateGlobal = function(req, res) {
    res.type('text/html');

    var message;
    try {
        var jsonBody = JSON.parse(req.body.globalConfiguration);

        validation.validate(jsonBody, "GLOBAL");
        model.saveGlobalConfig(jsonBody);

        message = {
            status : "OK",
            description : "Global configuration successfully updated!"
        };
        res.status('200');
    } catch (e) {
        message = {
            status : "ERROR",
            description : e.message
        };
        res.status('400');
    }

    res.render('configuration/index', {
        message : message,
        globalConfig: JSON.stringify(model.getGlobalConfigs(), null, 2),
        customConfig: JSON.stringify(model.getCustomConfigs(), null, 2)
    });
}

var updateCustom = function(req, res) {
    res.type('text/html');

    var message;
    try {
        var jsonBody = JSON.parse(req.body.customConfiguration);

        validation.validate(jsonBody, "CUSTOM");
        model.saveCustomConfig(jsonBody);

        message = {
            status : "OK",
            description : "Custom configuration successfully updated!"
        };
        res.status('200');
    } catch (e) {
        message = {
            status : "ERROR",
            description : JSON.stringify(e.message)
        };
        res.status('400');
    }

    res.render('configuration/index', {
        message : message,
        globalConfig: JSON.stringify(model.getGlobalConfigs(), null, 2),
        customConfig: JSON.stringify(model.getCustomConfigs(), null, 2)
    });
}
