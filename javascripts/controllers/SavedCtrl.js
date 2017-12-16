"use strict";

app.controller("SavedCtrl", function ($scope, AuthService, MovieQuoteService) {

    $scope.userQuote = [];

    const getUserQuotesFromFB = () => {

        let uid = AuthService.getCurrentUid();

        MovieQuoteService.getMovieQuoteForSaved(uid).then((results) => {
            results.forEach((result) => {
                MovieQuoteService.getSingleQuote(result.quoteId).then((quote) => {
                    $scope.userQuote.push(quote.data);
                });
            });
        }).catch((error) => {
            console.log("error in getUserQuotesFromFB", error);
        });
    };

    getUserQuotesFromFB();

});