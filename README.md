# Sandbox-configuration

Sandbox-configuration is an extention to the [Sandbox](https://getsandbox.com) platform that allows you to control the timeouts and failures of your routes.

The timeout configuration will only work with a customized version of Sandbox, available [here](https://github.com/luisrpp/sandbox).

## Getting Started

Just start [Sandbox](https://getsandbox.com) setting the base dir to the root of this repository.

## Routes definition

Use `routes.define` instead of `Sandbox.define`:

```javascript
var routes = require("../configuration/decorators.js")
var failures = require("../configuration/failures.js");

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
});
```

## Routes configuration

The route configuration can be defined on your code (there is an example in the source code), or at runtime via the url [http://localhost:8080/configuration](http://localhost:8080/configuration):

![Sandbox mock configuration screenshot](https://raw.githubusercontent.com/luisrpp/sandbox-configuration/master/images/configuration.png)

## License

MIT
