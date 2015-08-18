/**
 * Configuration Routes
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */

var view = require("./view.js");


Sandbox.define('/configuration', 'GET', view.get);

Sandbox.define('/configuration', 'POST', view.post);
