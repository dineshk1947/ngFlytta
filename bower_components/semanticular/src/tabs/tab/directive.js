angular.module('semanticular.tabs').directive('tab', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="ui bottom attached tab segment" data-tab=""' +
            ' ng-transclude></div>';


    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs, tabsetController) {
        $element = $($element[0]);
        var isActive = attrs.active != undefined,
            id = tabsetController.addTab(attrs.heading, isActive);

        if (isActive)
            $element.addClass('active');

        $element.attr('data-tab', id);

        // Listen destroy event and remove item
        scope.$on('$destroy', function() {
            tabsetController.removeTab(id);
        });
    };


    return {
        restrict: 'E',
        require: '^tabset',
        scope: {},
        template: template,
        transclude: true,
        replace: true,
        link: link
    };
}]);
