"use strict";

app.controller("EditCtrl", function ($location, $routeParams, $scope, MovieQuoteService){

    $scope.movieQuote = {};

    const getMovieQuoteToEdit = () => {
        MovieQuoteService.getSingleMovieQuoteToEdit($routeParams.id).then((result) => {
            $scope.movieQuote = result[0];
        }).catch((error) => {
            console.log("error in getMovieQuoteToEdit", error);
        });
    };

    getMovieQuoteToEdit();

    $scope.editMovieQuoteInFirebase = () => {
        let updateMovieQuote = MovieQuoteService.createMovieQuoteObject($scope.movieQuote);
        MovieQuoteService.editMovieQuote($scope.movieQuote, $scope.movieQuote.id).then(() => {
            console.log($scope.movieQuote);
            $location.path(`/search`);
        }).catch((error) => {
            console.log("error in updateMovieQuoteInFirebase", error);
        });
    };

});