"use strict";

app.controller("EditCtrl", function ($scope, MovieQuoteService){

    $scope.movieQuote = {};

    const getMovieQuoteToEdit = () => {
        MovieQuoteService.getSingleMovieQuoteToEdit().then((result) => {
            console.log($scope.contact = result.data);
        }).catch((error) => {
            console.log("error in getMovieQuoteToEdit", error);
        });
    };

});