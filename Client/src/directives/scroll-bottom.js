export default ['$timeout', function ($timeout) {
    return {
        scope: {
            scrollBottom: "="
        },
        link: function ($scope, $element) {
            $scope.$watchCollection('scrollBottom', function (newValue) {
                if (newValue) {
                    $timeout(function () {
                        $element[0].scrollTop = $element[0].scrollHeight;
                    }, 0);
                }
            });
        }
    }
}];
