"use strict";

app.controller("SavedCtrl", function ($scope, AuthService, MovieQuoteService) {

    $scope.userQuote = [];

    const getUserQuotesFromFB = () => {

        let uid = AuthService.getCurrentUid();

        MovieQuoteService.getMovieQuoteForSaved(uid).then((results) => {
            results.forEach((result) => {
                MovieQuoteService.getSingleQuote(result.quoteId).then((quote) => {
                    MovieQuoteService.getSingleMovie(quote.data.movieId).then((movie) => {
                        movie.data.character = quote.data.character;
                        movie.data.quote = quote.data.quote;
                        $scope.userQuote.push(movie.data);
                    }); 
                });
            });
        }).catch((error) => {
            console.log("error in getUserQuotesFromFB", error);
        });
    };

    getUserQuotesFromFB();

});