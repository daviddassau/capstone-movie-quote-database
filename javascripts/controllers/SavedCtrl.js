"use strict";

app.controller("SavedCtrl", function ($scope, AuthService, MovieQuoteService) {

    let uid = AuthService.getCurrentUid();
    
    const getUsersFavoriteMovieQuote = () => {
        MovieQuoteService.getMovieQuoteForSaved(uid).then((results) => {
        }).catch((error) => {
            console.log("error in getUsersFavoriteMovieQuote", error);
        });
    };

    getUsersFavoriteMovieQuote();

});