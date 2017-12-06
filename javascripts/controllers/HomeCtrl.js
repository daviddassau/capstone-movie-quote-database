"use strict";

app.controller("HomeCtrl", function ($rootScope, $scope, MovieQuoteService, MovieService) {
    
    const getMovieQuote = () => {
        MovieQuoteService.getMovieQuoteFromDB().then((result) => {
            $scope.movieQuote = result;
        }).catch((error) => {
            console.log("error in getMovieQuotes", error);
        });
    };

    getMovieQuote();

    const getMovie = () => {
        MovieService.getMovieFromDB($rootScope.uid).then((results) => {
            $scope.movie = results;
        }).catch((error) => {
            console.log("error in getMovie", error);
        });
    };

    getMovie();

});