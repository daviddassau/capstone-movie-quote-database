"use strict";

app.controller("AuthCtrl", function ($location, $scope, $rootScope, AuthService) {
    $scope.authenticate = () => {
        AuthService.authenticateGoogle().then((result) => {
            $rootScope.navbar = true;
            $scope.$apply(() => {
                $location.path("/home");
            });
        }).catch((err) => {
            console.log("error in authenticateGoogle", err);
        });
    };
});