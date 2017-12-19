"use strict";

app.controller("SavedCtrl", function ($scope, AuthService, MovieQuoteService) {

    

    const getUserQuotesFromFB = () => {
        $scope.userQuote = [];
        let uid = AuthService.getCurrentUid();

        MovieQuoteService.getMovieQuoteForSaved(uid).then((results) => {
            results.forEach((result) => {
                
                MovieQuoteService.getSingleQuote(result.quoteId).then((quote) => {
                    MovieQuoteService.getSingleMovie(quote.data.movieId).then((movie) => {
                        movie.data.character = quote.data.character;
                        movie.data.quote = quote.data.quote;
                        movie.data.quoteId = result.id;
                        $scope.userQuote.push(movie.data);
                    }); 
                });
            });
        }).catch((error) => {
            console.log("error in getUserQuotesFromFB", error);
        });
    };

    getUserQuotesFromFB();

    $scope.deleteQuote = (quoteId) => {
        MovieQuoteService.deleteUserMovieQuote(quoteId).then((results) => {
            getUserQuotesFromFB();
        }).catch((error) => {
            console.log("error in deleteQuote", error);
        });
    };

});