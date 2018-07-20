angular.module('myApp', ['semanticular.modal']).controller('DemoController', function($scope) {
    $scope.shouldShowModal = false;

    $scope.modalOptions = {
        closable: false,
        // duration: 4000,
        // extraClasses: ['basic'],
        onApprove: function() {
            alert('approved');
        },
        onDeny: function() {
            alert('denied');
        }
    };

    $scope.showModal = function() {
        $scope.shouldShowModal = true;
    };

    $scope.hideModal = function() {
        $scope.shouldShowModal = false;
    };
});
