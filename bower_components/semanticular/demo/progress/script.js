angular.module('myApp', ['semanticular.progress']).controller('DemoController', function($scope) {
    $scope.percent1 = 0;
    $scope.percent2 = 0.41;
    $scope.percent3 = 0.23;

    $scope.options3 = {
        label: 'Progress label',
        extraClasses: ['teal']
    };

    $scope.increase = function() {
        $scope.percent1 = ($scope.percent1 += 0.1) > 1 ? 1 : $scope.percent1;
        $scope.percent2 = ($scope.percent2 += 0.1) > 1 ? 1 : $scope.percent2;
        $scope.percent3 = ($scope.percent3 += 0.1) > 1 ? 1 : $scope.percent3;
    };
});
