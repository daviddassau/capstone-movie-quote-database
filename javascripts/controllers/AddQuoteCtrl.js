"use strict";

app.controller("AddQuoteCtrl", function ($location, $scope, $routeParams, AuthService, MovieService, MovieQuoteService) {

    $scope.movie = {};

    const getAddedMovie = () => {
        $scope.movie = MovieService.getAddedMovie();
    };

    getAddedMovie();

    $scope.saveMovieQuote = (movie) => {
        MovieQuoteService.getAllMovieQuotes().then((result) => {
            let movieQuoteCnt = result.length;

            let newMovieQuote = {};

            newMovieQuote.character = movie.character;
            newMovieQuote.isFavorited = false;
            newMovieQuote.movieId = MovieService.getAddedMovie().id;
            newMovieQuote.quote = movie.quote;
            newMovieQuote.uid = AuthService.getCurrentUid();

            MovieQuoteService.addNewMovieQuote(newMovieQuote).then(() => {
                $location.path(`/search`);
            }).catch((error) => {
                console.log("error in submit", error);
            });

        });
    };

});