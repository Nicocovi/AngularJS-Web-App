export default ['$window', '$timeout', function ($window, $timeout) {
    return {
        link: link,
        restrict: 'A'
    };

    function link(scope, element, attrs) {
        scope.width = $window.innerWidth;
        scope.height = $window.innerHeight;

        var contentView = document.getElementById("main-content-view");

        function onResize() {
            if (scope.width !== $window.innerWidth || scope.height !== $window.innerHeight || !scope.widthContent) {
                // only fire on change  
                scope.width = $window.innerWidth;
                scope.height = $window.innerHeight;
                if (contentView) {
                    if (contentView.getBoundingClientRect().right === 0) {
                        scope.widthContent = scope.width;
                    } else {
                        scope.widthContent = contentView.getBoundingClientRect().right - contentView.getBoundingClientRect().left;
                    }
                }
                scope.$digest();
            }
        };

        function cleanUp() {
            angular.element($window).off('resize', onResize);
        }

        angular.element($window).on('resize', onResize);
        scope.$on('$destroy', cleanUp);
        $timeout(function () {
            $window.dispatchEvent(new Event("resize"));
        });
    }
 }];
