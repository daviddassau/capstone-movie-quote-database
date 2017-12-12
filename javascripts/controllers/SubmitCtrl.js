"use strict";

app.controller("SubmitCtrl", function ($location, $scope, tmdbService, MovieService) {

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

    $scope.addQuote = (movie) => {
        MovieService.getMovieByMovieDbIdFromDB(movie.id).then((result) => {
            console.log("result", result);
            if (result.length > 0) {
                $location.path(`/addQuote`);
            }
            else{
                let newMovie = MovieService.createMovieObject(movie);
                MovieService.addNewMovie(newMovie).then(() => {
                    $location.path(`/addQuote`);
                }).catch((error) => {
                    console.log("error in addQuote", error);
                });
                // console.log("movie from API", movie);
                // console.log("call from createMovieObject", MovieService.createMovieObject(movie));
                
            }
        }).catch((error) => {
            console.log("error in addQuote", error);
        });
    };



});