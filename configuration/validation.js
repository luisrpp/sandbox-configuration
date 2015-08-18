/**
 * Configuration validations
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */

var globalConfigSchema = {
  type: 'object',
  properties: {
    timeout: {
      required: true,
      type: 'number'
    },
    timeoutPercentage: {
      required: true,
      type: 'number'
    },
    failurePercentage: {
      required: true,
      type: 'number'
    }
  }
};

var customConfigSchema = {
    type: 'array',
    required: false,
    items: {
        type: 'object',
        properties: {
            route: {
                required: true,
                type: 'string'
            },
            method: {
                required: true,
                type: 'string'
            },
            settings: {
                required: true,
                type: 'object',
                properties: {
                    timeout: {
                        required: true,
                        type: 'number'
                    },
                    timeoutPercentage: {
                        required: true,
                        type: 'number'
                    },
                    failurePercentage: {
                        required: true,
                        type: 'number'
                    }
                }
            }
        }
    }
};


var ValidationError = function(error) {
    this.code = 400;
    this.message = "Validation error: <code>" + JSON.stringify(error, null, 2) + "</code>";
    this.date = moment().format("YYYY-MM-DDTHH:mm:ssZ");
}


var jsonSchemaValidator = amanda('json');


exports.validate = function(data, type) {
    if (type == 'CUSTOM') {
        jsonSchemaValidator.validate(data, customConfigSchema, function(error) {
            if (!(error === undefined)) {
                throw new ValidationError(error);
            }
        });
    } else {
        jsonSchemaValidator.validate(data, globalConfigSchema, function(error) {
            if (!(error === undefined)) {
                throw new ValidationError(error);
            }
        });
    }
}
