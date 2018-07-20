angular.module('myApp', ['semanticular.radio']).controller('DemoController', function($scope) {
    $scope.radio1 = 'value2';
    $scope.radio2 = { value: 'blue' };

    $scope.colors = ['orange', 'blue', 'black', 'yellow'];

    $scope.options = {
        // isDisabled: true,
        style: 'toggle'
    };
});
