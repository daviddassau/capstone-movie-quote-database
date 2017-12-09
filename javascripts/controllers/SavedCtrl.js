"use strict";

app.controller("SavedCtrl", function ($scope, AuthService, MovieQuoteService) {

    let uid = AuthService.getCurrentUid();
    
    const getUsersFavoriteMovieQuote = () => {
        MovieQuoteService.getMovieQuoteForSaved(uid).then((results) => {
            // $scope.movieQuote = results;
            // console.log("results", results);
            // $scope.isFavorited = results;
            // console.log(results);
        }).catch((error) => {
            console.log("error in getUsersFavoriteMovieQuote", error);
        });
    };

    getUsersFavoriteMovieQuote();

});