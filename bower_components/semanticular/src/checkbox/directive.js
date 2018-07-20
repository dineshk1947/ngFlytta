angular.module('semanticular.checkbox').directive('checkbox', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="ui checkbox">' +
            '<input type="checkbox" tabindex="0" class="hidden">' +
            '<label ng-transclude></label>' +
        '</div>';


    /**
     * Default options.
     * @type {Object}
     */
    var defaults = {
        extraClasses: [],
        isDisabled: false,
        isReadOnly: false,
        style: 'standart' // slider, toggle,
    };


    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs, ngModel) {
        $element = $($element[0]);
        var options = $.extend(true, {}, defaults, scope.options || {});

        // Listen ng-model's value
        var modelListener = scope.$watch(function() {
            return ngModel.$modelValue;
        }, function(val) {
            $element.checkbox(val ? 'set checked' : 'set unchecked');
        });

        // Handle extra classes
        if (options.style != 'standart')
            options.extraClasses.push(options.style);

        if (options.isDisabled)
            options.extraClasses.push('disabled');

        if (options.isReadOnly)
            options.extraClasses.push('read-only');

        // Clear model listener on destroy
        scope.$on('$destroy', function() {
            modelListener();
        });

        $element
            .addClass(options.extraClasses.join(' '))
            .checkbox({
                onChange: function() {
                    ngModel.$setViewValue($element.checkbox('is checked'));
                }
            });
    };


    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        template: template,
        transclude: true,
        require: 'ngModel',
        replace: true,
        link: link
    };
}]);
