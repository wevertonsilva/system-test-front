angular.module('meuApp', [])
    .controller('MainController', ['$scope', function ($scope) {
        $scope.master = {};

        $scope.save = function (user) {
            $scope.master = angular.copy(user);
        };
    }]);