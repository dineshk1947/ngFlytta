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
