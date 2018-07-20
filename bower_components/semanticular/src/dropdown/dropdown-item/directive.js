angular.module('semanticular.dropdown').directive('dropdownItem', function() {
    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs, dropdownController) {
        var title = scope.title || $element[0].innerHTML,
            value = scope.value || attrs.value || title;

        // Add item
        dropdownController.addItem(title, value);

        // Listen destroy event and remove item
        scope.$on('$destroy', function() {
            dropdownController.removeItem(value);
        });
    };


    return {
        require: '^dropdown',
        restrict: 'E',
        scope: {
            value: '=',
            title: '='
        },
        link: link
    };
});
