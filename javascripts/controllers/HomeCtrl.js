"use strict";

app.controller("HomeCtrl", function ($rootScope, $scope, MovieQuoteService, MovieService) {
    
    const getMovieQuotes = () => {
        MovieQuoteService.getMovieQuoteFromDB($rootScope.uid).then((results) => {
            $scope.movieQuote = results;
        }).catch((error) => {
            console.log("error in getMovieQuotes", error);
        });
    };

    getMovieQuotes();

    const getMovie = () => {
        MovieService.getMovieFromDB($rootScope.uid).then((results) => {
            $scope.movie = results;
        }).catch((error) => {
            console.log("error in getMovie", error);
        });
    };

    getMovie();

});