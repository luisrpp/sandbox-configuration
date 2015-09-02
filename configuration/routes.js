/**
 * Configuration Routes
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */

var view = require("./view.js");


Sandbox.define('/admin', 'GET', view.get);
Sandbox.define('/admin', 'POST', view.post);
