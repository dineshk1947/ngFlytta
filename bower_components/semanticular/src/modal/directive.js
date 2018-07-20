angular.module('semanticular.modal').directive('modal', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template = '<div class="ui modal" ng-transclude></div>';


    /**
     * Default options.
     * @type {Object}
     */
    var defaults = {
        extraClasses: [],
        closable: true,
        observeChanges: true,
        transition: 'scale',
        duration: 400,
        onShow: function() {},
        onHide: function() {},
        onApprove: function() {},
        onDeny: function() {}
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
            $element.modal(val ? 'show' : 'hide');
        });

        // Clear model listener on destroy
        scope.$on('$destroy', function() {
            modelListener();
        });

        $element
            .addClass(options.extraClasses.join(' '))
            .modal({
                closable: options.closable,
                observeChanges: options.observeChanges,
                transition: options.transition,
                duration: options.duration,
                onShow: function() {
                    options.onShow();
                },
                onHide: function() {
                    if (ngModel.$modelValue)
                        ngModel.$setViewValue(false);

                    options.onHide();
                },
                onApprove: function() {
                    options.onApprove();
                },
                onDeny: function() {
                    options.onDeny();
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
