(function() {

  'use strict';

  angular
    .module('auth0.lockPasswordless', [])
    .provider('lockPasswordless', lockPasswordless);

  function lockPasswordless() {
    if (!angular.isFunction(Auth0LockPasswordless)) {
      throw new Error('Auth0LockPasswordless must be loaded.');
    }

    this.init = function(config) {
      if (!config) {
        throw new Error('clientID and domain must be provided to lockPasswordless');
      }
      this.clientID = config.clientID;
      this.domain = config.domain;
      this.options = config.options || {};
    };

    this.$get = ["$rootScope", function($rootScope) {

      var LockPasswordless = new Auth0LockPasswordless(
        this.clientID,
        this.domain,
        this.options
      );
      var lockPasswordless = {};
      var functions = [];
      for (var i in LockPasswordless) {
        if (angular.isFunction(LockPasswordless[i])) {
          functions.push(i);
        }
      }

      function wrapArguments(parameters) {
        var lastIndex = parameters.length - 1,
          func = parameters[lastIndex];
        if (angular.isFunction(func)) {
          parameters[lastIndex] = function() {
            var args = arguments;
            $rootScope.$evalAsync(function() {
              func.apply(LockPasswordless, args);
            });
          };
        }
        return parameters;
      }

      for (var i = 0; i < functions.length; i++) {
        lockPasswordless[functions[i]] = (function(name) {
          var customFunction = function() {
            return LockPasswordless[name].apply(LockPasswordless, wrapArguments(arguments));
          };
          return customFunction;
        })(functions[i]);
      }
      return lockPasswordless;
    }];
  }
})();
