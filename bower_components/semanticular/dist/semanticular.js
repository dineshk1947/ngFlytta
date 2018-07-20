angular.module('semanticular.dropdown', []);

angular.module('semanticular.dropdown').controller('DropdownController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    /**
     * Default options.
     * @type {Object}
     */
    var defaults = {
        placeholder: '',
        allowSearch: false,
        allowMultipleSelection: false
    };


    $scope.items = [];
    $scope.control = $scope.control || {};
    $scope.options = $.extend(true, {}, defaults, $scope.options || {});
    $scope.intentedChangeValue = null;
    $scope.intentCount = 0;
    $scope.intentCountLimit = 50;


    /**
     * Save original onChange handler in options, we will intercept that event.
     */
    var onChangeOriginal = $scope.options.onChange;
    $scope.options.onChange = function(val) {
        $scope.control.clearInput();

        if ($scope.options.allowMultipleSelection)
            val = val ? val.split(',') : [];

        if ($scope.intentedChangeValue && !$scope.isEqualValues($scope.intentedChangeValue, val)) {
            if ($scope.options.log)
                console.log('Changed value & intented change mismatch, discarding onChange event.');

            return;
        }

        $scope.intentedChangeValue = null;
        $scope.intentCount = 0;

        if (!$scope.isEqualValues($scope.model, val)) {
            if ($scope.options.log)
                console.log('Settings model value...', val);

            $scope.model = val;

            onChangeOriginal && onChangeOriginal(val);

            // Sorry for anti pattern. There is no way to find out that
            // this method is called because model change or view change
            if (!$rootScope.$$phase)
                $scope.$apply()
        }
    };


    /**
     * Adds item.
     * @param {string} text
     * @param {string} value
     */
    this.addItem = $scope.control.addItem = function(title, value) {
        $scope.items.push({
            title: title,
            value: value
        });
    };


    /**
     * Removes item.
     * @param {string} value
     */
    this.removeItem = $scope.control.removeItem = function(value) {
        var index = -1;

        $scope.items.forEach(function(item, i) {
            if (item.value == value)
                index = i;
        });

        if (index > -1)
            $scope.items.splice(index, 1);
    };


    /**
     * Removes all items.
     */
    $scope.clearItems = $scope.control.clearItems = function() {
        $scope.items = [];
    };


    /**
     * On input change event handler.
     * @param {Object} e
     */
    $scope.onInputChange = function(e) {
        var remote = $scope.options.remote,
            value = e.target.value.trim();

        $scope.remoteFetch_(value);
        remote.onInputChange && remote.onInputChange(value);
    };


    /**
     * Fetches remote data.
     * @param {?string} value
     */
    $scope.remoteFetch_ = function(value) {
        var remote = $scope.options.remote,
            url;

        if (!remote)
            return;

        if (typeof remote.beforeSend === 'function') {
             url = remote.beforeSend(remote.url, value);

             if (!url)
                return;
        } else
            url = remote.url.replace('{query}', encodeURIComponent(value));

        $http
            .get(url)
            .then(function(response) {
                if (response.status >= 300)
                    throw new Error('Bad response');

                var data = response.data;
                if (typeof remote.onResponse === 'function')
                    data = remote.onResponse(data, value);

                if (!_.isArray(data))
                    data = [];

                $scope.items = data;

                $scope.control.updateMessage();
            });
    };


    /**
     * Debounced remoteFetch_ method.
     */
    $scope.remoteFetch = _.debounce($scope.remoteFetch_, 250);


    /**
     * Checks value equality. If values are array, the order is not important
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    $scope.isEqualValues = function(a, b) {
        if (!$scope.options.allowMultipleSelection)
            return a == b;

        a = _.sortBy(a);
        b = _.sortBy(b);

        return _.isEqual(a, b);
    };
}]);

angular.module('semanticular.dropdown').directive('dropdown', [function() {
    /**
     * Template of directive.
     * @type {String}
     */
    var template =
        '<div class="ui dropdown">' +
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

angular.module('semanticular.modal', []);

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

angular.module('semanticular.popup', []);

angular.module('semanticular.popup').directive('popup', [function() {
    /**
     * Default options.
     * @type {Object}
     */
    var defaults = {
        variation: '',
        content: '',
        title: '',
        html: '',
        on: 'hover',
        position: 'top left',
        inline: false,
        transition: 'slide down',
        duration: 200,
        setFluidWidth: true,
        hoverable: false,
        closable: true,
        hideOnScroll: 'auto',
        distanceAway: 0,
        offset: 0,
        onShow: function() {},
        onHide: function() {}
    };


    /**
     * Linker function.
     */
    var link = function(scope, $element, attrs) {
        var options = $.extend(true, {}, defaults, scope.popup || {});
        $element = $($element[0]);

        $element.popup({
            variation: options.variation,
            content: options.content,
            title: options.title,
            html: options.html,
            on: options.on,
            position: options.position,
            inline: options.inline,
            transition: options.transition,
            duration: options.duration,
            setFluidWidth: options.setFluidWidth,
            hoverable: options.hoverable,
            closable: options.closable,
            hideOnScroll: options.hideOnScroll,
            distanceAway: options.distanceAway,
            offset: options.offset,
            onShow: function() {
                options.onShow();
            },
            onHide: function() {
                options.onHide();
            }
        });
    };


    return {
        restrict: 'A',
        scope: {
            popup: '='
        },
        link: link
    };
}]);

angular.module('semanticular.checkbox', []);

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

angular.module('semanticular.radio', []);

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

angular.module('semanticular.progress', []);

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

angular.module('semanticular.tabs', []);

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

angular.module('semanticular.tabs').controller('TabsetController', ['$scope', function($scope) {
    $scope.tabs = [];
    var index = 1,
        prefix = 'tab_' + Math.random().toString(36).substring(7);


    /**
     *
     * @param {string} heading
     * @param {boolean=} opt_isActive
     * @return {number}
     */
    this.addTab = function(heading, opt_isActive) {
        var tab = {
            heading: heading,
            id: prefix + '_' + index,
            isActive: !!opt_isActive
        };

        index++;
        $scope.tabs.push(tab);

        return tab.id;
    };


    /**
     *
     * @param {number} id
     */
    this.removeTab = function(id) {
        var index = -1;

        $scope.tabs.forEach(function(tab, i) {
            if (tab.id == id)
                index = i;
        });

        if (index > -1)
            $scope.tabs.splice(index, 1);
    };
}]);

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

angular.module('semanticular', [
    'semanticular.dropdown',
    'semanticular.modal',
    'semanticular.popup',
    'semanticular.checkbox',
    'semanticular.radio',
    'semanticular.progress',
    'semanticular.tabs'
]);
