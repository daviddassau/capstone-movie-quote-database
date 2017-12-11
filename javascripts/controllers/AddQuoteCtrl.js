"use strict";

app.controller("AddQuoteCtrl", function ($scope, $routeParams, MovieService) {

    $scope.movie = {};

    const getAddedMovie = () => {
        console.log(MovieService.getAddedMovie());
    };

    getAddedMovie();

});