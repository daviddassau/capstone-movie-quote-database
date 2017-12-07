"use strict";

app.controller("SearchCtrl", function ($scope, MovieQuoteService, MovieService) {

    $scope.movies = [];
    $scope.movieIds = [];

    $scope.enterPush = (event) => {
        if (event.keyCode === 13) {
            MovieQuoteService.searchMovieQuotes(event.target.value).then((results) => {
                getMovies(results);
            }).catch((err) => {
                console.log("error in searchMovies", err);
            });
        }
    };

    const getMovies = (movies) => {
        $scope.movieIds = [];
        $scope.movies = [];

        $.each(movies, function(idx, movie){
            MovieService.getMovieFromDB(movie.movieId).then((results) => {
                if (results.length > 0 && $.inArray($scope.movieIds, movie.movieId) == -1){
                    $scope.movieIds.push(movie.movieId);

                    let aMovie = { quote: movie.quote, character: movie.character, title: results[0].title,
                        poster_path: results[0].poster_path, releaseDate: results[0].releaseDate };

                    $scope.movies.push(aMovie);
                }
            }).catch((error) => {
                console.log("error in getMovie", error);
            });
        });
    };

});