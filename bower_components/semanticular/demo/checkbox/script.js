angular.module('myApp', ['semanticular.checkbox']).controller('DemoController', function($scope) {
    $scope.checkbox1 = true;
    $scope.checkbox2 = false;

    $scope.toggle = function() {
        $scope.checkbox1 = !$scope.checkbox1;
        $scope.checkbox2 = !$scope.checkbox2;
    };

    $scope.label2 = 'Label for disabled checkbox';

    $scope.options = {
        isDisabled: true
        // style: 'toggle'
    };
});
