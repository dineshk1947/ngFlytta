angular.module('semanticular.radio').directive('radio', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="ui radio checkbox">' +
            '<input type="radio" tabindex="0" class="hidden">' +
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

        var value = scope.value || attrs.value,
            options = $.extend(true, {}, defaults, scope.options || {});

        // Listen ng-model's value
        var modelListener = scope.$watch(function() {
            return ngModel.$modelValue;
        }, function(newValue) {
            $element.checkbox(newValue == value ? 'set checked' : 'set unchecked');
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
                    ngModel.$setViewValue(value);
                }
            });
    };


    return {
        restrict: 'E',
        scope: {
            options: '=',
            value: '='
        },
        template: template,
        transclude: true,
        require: 'ngModel',
        replace: true,
        link: link
    };
}]);
