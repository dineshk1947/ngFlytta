angular.module('semanticular.progress').directive('progress', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="ui progress">' +
            '<div class="bar"></div>' +
            '<div class="label" ng-show="label" ng-bind="label"></div>' +
        '</div>';


    /**
     * Default options.
     * @type {Object}
     */
    var defaults = {
        label: '',
        extraClasses: []
    };


    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs, ngModel) {
        $element = $($element[0]);
        var options = $.extend(true, {}, defaults, scope.options || {});
        scope.label = attrs.label || options.label;

        // Listen ng-model's value
        var modelListener = scope.$watch(function() {
            return ngModel.$modelValue;
        }, function(val) {
            $element.progress({
                percent: ngModel.$modelValue * 100
            });
        });

        // Clear model listener on destroy
        scope.$on('$destroy', function() {
            modelListener();
        });

        $element
            .addClass(options.extraClasses.join(' '))
            .checkbox();
    };


    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        template: template,
        require: 'ngModel',
        replace: true,
        link: link
    };
}]);
