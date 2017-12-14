"use strict";

app.controller("SearchCtrl", function ($location, $scope, MovieQuoteService, MovieService) {

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

    const movieCreator = (quote, movie) => {
        return {
            quote: quote.quote,
            character: quote.character,
            movieId: quote.movieId,
            title: movie.title,
            poster_path: movie.poster_path,
            releaseDate: movie.releaseDate
        };
    };

    const getMovies = (quotes) => {
        $scope.movies = [];

        quotes.forEach((quote) => {
            MovieService.getMovieFromDB(quote.movieId).then((results) => {
                if (results.length > 0) {
                    const completeQuote = movieCreator(quote, results[0]);
                    $scope.movies.push(completeQuote);
                }
            }).catch ((error) => {
                console.log("error in getMovie", error);
            });
        });
    };

    $scope.editMovieQuote = (movieId) => {
        $location.path(`/edit/${movieId}`);
    };

});