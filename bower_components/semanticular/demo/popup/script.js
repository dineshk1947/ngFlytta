angular.module('myApp', ['semanticular.popup']).controller('DemoController', function($scope) {
    $scope.popupOptions = {
        // variation: 'wide',
        content: 'This is a simple content of a popup!',
        // title: 'Title',
        // html: '', // If html is defined, title and content is overridden.
        // on: 'click',
        // position: 'bottom right', // Arrow position
        // inline: false,
        // transition: 'slide down',
        // duration: 4000,
        // setFluidWidth: true,
        // hoverable: false,
        // closable: true,
        // hideOnScroll: 'auto',
        // distanceAway: 0,
        // offset: 0,
        onShow: function() {
            console.log('Popup shown!');
        },
        onHide: function() {
            console.log('Popup hidden!');
        }
    };
});
