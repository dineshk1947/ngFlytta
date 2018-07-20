'use strict';

angular.module('ngPico', [])
  .directive('pico', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var path       = attrs.pico.substr(0, attrs.pico.lastIndexOf('.'));
      var extension  = attrs.pico.substr(attrs.pico.lastIndexOf('.'));
      var attrWebP   = attrs.webp || 'false';
      var attrRetina = attrs.retina || 'true';
      var attrPrefix = attrs.prefix || '@2x';

      function supportWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function() {
          return callback(webP.height == 1);
        };
        webP.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
      };

      function setSource(extension) {
        if (window.devicePixelRatio >= 1.5 || window.devicePixelRatio >= 2 && attrRetina === 'true') {
          return element[0].src = path + attrPrefix + extension;
        }
        return element[0].src = path + extension;
      }

      if (attrWebP === 'true') {
        supportWebP(function(result) {
          if (result) {
            return setSource('.webp');
          }
          return setSource(extension);
        });
      } else {
        return setSource(extension);
      }
    }
  };
});
