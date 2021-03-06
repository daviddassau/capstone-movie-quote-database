"use strict";

app.controller("SearchCtrl", function ($location, $scope, MovieQuoteService, MovieService) {

    $scope.movies = [];
    $scope.movieIds = [];
    $scope.quotesDisplay = -1;

    $scope.enterPush = (event) => {
        if (event.keyCode === 13) {
            MovieQuoteService.searchMovieQuotes(event.target.value).then((results) => {
                if (results.length === 0){
                    $scope.quotesDisplay = 0;
                } else {
                    $scope.quotesDisplay = 1;
                    getMovies(results);
                }
            }).catch((err) => {
                console.log("error in searchMovies", err);
            });
        }
    };

    const movieCreator = (quote, movie) => {
        console.log(quote);
        return {
            quote: quote.quote,
            character: quote.character,
            movieId: quote.movieId,
            title: movie.title,
            poster_path: movie.poster_path,
            releaseDate: movie.releaseDate,
            quoteId: quote.quoteId
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

    $scope.saveMovieQuote = (quote) => {
        MovieQuoteService.updateUserMovieQuoteFromSearchPage(quote, quote.id).then((result) => {
            
        }).catch((error) => {
            console.log("error in saveMovieQuote", error);
        });
    };

});