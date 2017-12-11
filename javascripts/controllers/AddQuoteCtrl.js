"use strict";

app.controller("AddQuoteCtrl", function ($scope, $routeParams, MovieService, MovieQuoteService) {

    $scope.movie = {};

    const getAddedMovie = () => {
        $scope.movie = MovieService.getAddedMovie();
    };

    getAddedMovie();

    $scope.saveMovieQuote = (movie) => {
        MovieQuoteService.getAllMovieQuotes().then((result) => {
            let movieQuoteCnt = result.length;

            console.log(movie);
            let newMovieQuote = {};

            newMovieQuote.character = movie.character;
            newMovieQuote.isFavorited = false;
            newMovieQuote.movieId = 'movieQuote' + movieQuoteCnt + 1;
            newMovieQuote.quote = movie.quote;

            MovieQuoteService.addNewMovieQuote(newMovieQuote, movieQuoteCnt).then(() => {
                //$location.path('contacts/view');
            }).catch((error) => {
                console.log("error in submit", error);
            });

        });
    };

});