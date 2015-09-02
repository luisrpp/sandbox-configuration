/**
 * My API Sandbox
 * 
 */

var routes = require("../configuration/decorator.js");
var configModel = require("../configuration/model.js");

var MockConfiguration = configModel.MockConfiguration;

// A basic route returning a canned response
routes.define('/test', 'GET', function(req, res) {

    res.send('Hello world');

}, new MockConfiguration(2000, 50, 0));
