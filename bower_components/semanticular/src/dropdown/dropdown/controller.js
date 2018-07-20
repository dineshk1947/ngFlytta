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
