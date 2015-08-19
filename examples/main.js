/**
 * My API Sandbox
 * 
 */

var routes = require("../configuration/decorators.js")
var failures = require("../configuration/failures.js");

var configModel = require("../configuration/model.js");
var MockConfiguration = configModel.MockConfiguration;

// A basic route returning a canned response
routes.define('/test', 'GET', function(req, res) {
    try {
        failures.activate(req, function() {
            throw { message: "Some error" };
        });

        res.send('Hello world');
    } catch (e) {
        res.send(e.message);
    }
}, new MockConfiguration(2000, 50, 0));
