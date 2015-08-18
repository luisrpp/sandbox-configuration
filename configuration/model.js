/**
 * Config model
 * 
 * @author Luis Roberto Pereira de Paula
 * @since 0.1
 */

var globalConfiguration = {
    'timeout': 0,
    'timeoutPercentage': 100,
    'failurePercentage': 0
}

var customConfiguration = [];


exports.MockConfiguration = function(timeout, timeoutPercentage, failurePercentage) {
    this.timeout = timeout;
    this.timeoutPercentage = timeoutPercentage;
    this.failurePercentage = failurePercentage;
}

exports.getGlobalConfigs = function() {
    return getGlobalConfiguration();
}

exports.getCustomConfigs = function() {
    return getCustomConfigurations();
}

exports.getConfigForRoute = function(route, method) {
    var custom = getCustomConfigurations();
    
    var route = _.find(custom, { "route": route, "method": method });

    if (!route) {
        return getGlobalConfiguration();
    } else {
        return route.settings;
    }
}

exports.saveGlobalConfig = function(newConfig) {
    state.globalConfiguration = newConfig;
    console.log('Global configuration updated: ' + JSON.stringify(newConfig));
}

exports.saveCustomConfig = function(newConfig) {
    state.customConfiguration = newConfig;
    console.log('Custom configuration updated: ' + JSON.stringify(newConfig));
}

exports.saveCustomRoute = function(route, method, mockConfiguration) {
    var custom = getCustomConfigurations();

    var routes = _.filter(custom, function(element) {
        return element != route;
    });

    custom.push({ route: route, method: method, settings: mockConfiguration });
    state.customConfiguration = _.sortBy(custom, 'route');
}

var getGlobalConfiguration = function() {
    state.globalConfiguration = state.globalConfiguration || globalConfiguration;
    return state.globalConfiguration;
}

var getCustomConfigurations = function() {
    state.customConfiguration = state.customConfiguration || _.sortBy(customConfiguration, 'route');
    return state.customConfiguration;
}
