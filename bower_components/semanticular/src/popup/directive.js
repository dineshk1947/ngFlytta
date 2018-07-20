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
