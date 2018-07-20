angular.module('myApp', ['semanticular.tabs']).controller('DemoController', function($scope) {
    $scope.tabs = [
        {
            header: 'Header 1',
            content: 'Content 1'
        },
        {
            header: 'Header 2',
            content: 'Content 2'
        },
        {
            header: 'Header 3',
            content: 'Content 3'
        }
    ];
});
