export default ['$window', function ($window) {
    return {
        restrict: 'A',
        scope: {
            offset: "@",
            scrollClass: "@"
        },
        link: function (scope, element, attrs) {
            angular.element($window).bind("wheel", function () {
                if (!scope.offset) {
                    scope.offset = $window.innerWidth / 2.124 - 50;
                }
                var slider = document.getElementById("my-landingpage-slideshow");
                if (slider) {
                    if ((-1 * slider.getBoundingClientRect().top) >= parseInt(scope.offset)) {
                        element.addClass(scope.scrollClass);
                    } else {
                        element.removeClass(scope.scrollClass);
                    }
                }
            });
        }
    };
}];
