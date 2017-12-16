"use strict";

app.controller("HomeCtrl", function ($rootScope, $scope, MovieQuoteService, MovieService) {
    
    const getMovieQuote = () => {
        MovieQuoteService.getMovieQuoteFromDB().then((result) => {
            $scope.movieQuote = result;
            getMovie($scope.movieQuote.movieId);
        }).catch((error) => {
            console.log("error in getMovieQuotes", error);
        });
    };

    getMovieQuote();

    const getMovie = (movieId) => {
        MovieService.getMovieFromDB(movieId).then((results) => {
            $scope.movie = results[0];
        }).catch((error) => {
            console.log("error in getMovie", error);
        });
    };

    $scope.starChange = (quote) => {
        let updateMovieQuote = {};



        
        // updateMovieQuote = MovieQuoteService.createMovieQuoteObject(quote);
        console.log("starChange", quote);
        
        MovieQuoteService.updateUserMovieQuote(quote, quote.id).then((result) => {
            getMovieQuote();
        }).catch((error) => {
            console.log("error in starChange", error);
        });

    };

});