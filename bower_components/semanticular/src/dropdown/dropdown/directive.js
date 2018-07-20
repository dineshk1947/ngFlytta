angular.module('semanticular.dropdown').directive('dropdown', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="ui selection dropdown">' +
            '<input type="hidden" name="">' +
            '<i class="dropdown icon"></i>' +
            '<div class="default text"></div>' +
            '<div class="menu">' +
                '<div class="item" ng-repeat="item in items" ' +
                        'data-value="{{item.value}}">' +
                    '{{item.title}}' +
                '</div>' +
            '</div>' +
            '<div ng-transclude style="display: none;"></div>' +
        '</div>';


    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs, ngModel) {
        $element = $($element[0]);
        var extraClasses = [],
            searchInputElement;

        if (scope.options.allowSearch)
            extraClasses.push('search');

        if (scope.options.allowMultipleSelection)
            extraClasses.push('multiple');

        // Manually add placeholder
        $element
            .find('.default.text')
            .text(scope.options.placeholder || '');

        // Initalize dropdown
        $element
            .addClass(extraClasses.join(' '))
            .dropdown(scope.options);

        if (scope.options.allowSearch || scope.options.remote) {
            searchInputElement = $element.find('input.search')[0];
            searchInputElement.addEventListener('input', scope.onInputChange,
                false);
        }

        // Sets view value
        scope.control.setViewValue = function(value, opt_force) {
            if (!value || scope.isEqualValues(scope.control.getViewValue(), value))
                return;

            if (scope.options.log)
                console.log('Settings view value... (#' + scope.intentCount + ')', value);

            var command = 'set selected';

            if (scope.options.allowMultipleSelection)
                command = 'set exactly';
            else
                value += ''; // Stringify the value

            if (scope.intentCount >= scope.intentCountLimit) {
                if (scope.options.log)
                    console.log('Intent limit is exceed, giving up.');

                return;
            }

            scope.intentedChangeValue = value;
            scope.intentCount++;
            $element.dropdown(command, value);

            // Check if it's set selected indeed. While initalizing sometimes
            // this does not work.
            if (opt_force) {
                var viewValue = scope.control.getViewValue();

                if (!scope.isEqualValues(viewValue, value)) {
                    setTimeout(
                        scope.control.setViewValue.bind(null, value, opt_force),
                        50
                    );
                }
            }
        };

        // Gets view value
        scope.control.getViewValue = function() {
            var viewValue = $element.dropdown('get value');
            if (scope.options.allowMultipleSelection)
                viewValue = viewValue ? viewValue.split(',') : [];

            return viewValue;
        };

        // Shows dropdown
        scope.control.show = function() {
            $element.dropdown('show');
        };

        // Hides dropdown
        scope.control.hide = function() {
            $element.dropdown('hide');
        };

        // Show&hide loading
        scope.control.setLoading = function(value) {
            var action = 'removeClass';

            if (value)
                value = 'addClass';

            $element[action]('loading');
        };

        // Clears input
        scope.control.clearInput = function() {
            if (searchInputElement)
                searchInputElement.value = '';
        };

        // Check dropdown messages like `no results`, if there are items,
        // remove messages.
        scope.control.updateMessage = function() {
            if (scope.items.length > 0)
                $element.dropdown('remove message');
        };

        // Sets dropdown selected text
        scope.control.setText = function(text) {
            $element.dropdown('set text', text);
        };

        // Refreshes dropdown selected text
        scope.control.refreshText = function() {
            if (!scope.model)
                return;

            var result = _.find(scope.items, {value: scope.model}),
                text = result ? result.title : null;

            if (!text)
                return;

            $element.dropdown('set text', text);
        };

        // Listen ng-model's value
        var modelListener = scope.$watch('model', function(val) {
            scope.control.setViewValue(scope.model, true);
        });

        // Clear model listener on destroy
        scope.$on('$destroy', function() {
            modelListener();

            if (searchInputElement)
                searchInputElement.addEventListener('input',
                    scope.onInputChange, false);
        });
    };


    return {
        restrict: 'E',
        scope: {
            model: '=ngModel',
            options: '=?',
            control: '=?'
        },
        template: template,
        transclude: true,
        replace: true,
        controller: 'DropdownController',
        link: link
    };
}]);
