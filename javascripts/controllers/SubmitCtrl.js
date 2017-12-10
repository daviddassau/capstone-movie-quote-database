"use strict";

app.controller("SubmitCtrl", function ($scope, tmdbService) {

    $scope.movies = [];

    $scope.enterPush = (event) => {
        if(event.keyCode === 13){
            tmdbService.searchMovies(event.target.value).then((results) => {
                $scope.movies = results.data.results;
            }).catch((error) => {
                console.log("error in searchMovies", error);
            });
        }
    };

});