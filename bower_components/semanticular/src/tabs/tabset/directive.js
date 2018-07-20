angular.module('semanticular.tabs').directive('tabset', ['$timeout', function($timeout) {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="tabset">' +
            '<div class="ui top attached tabular menu">' +
                '<a class="item" ng-repeat="tab in tabs" data-tab="{{tab.id}}"' +
                    ' ng-class="{active: tab.isActive}">{{tab.heading}}</a>' +
            '</div>' +
            '<div ng-transclude></div>' +
        '</div>';


    /**
     * Default options.
     * @type {Object}
     */
    var defaults = {
        extraClasses: []
    };


    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs) {
        $element = $($element[0]);
        var options = $.extend(true, {}, defaults, scope.options || {});

        $timeout(function() {
            $element
                .find('.menu')
                .addClass(options.extraClasses.join(' '))
                .find('.item')
                .tab();
        });
    };


    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        template: template,
        transclude: true,
        replace: true,
        controller: 'TabsetController',
        link: link
    };
}]);
