"use strict";

app.service("MovieQuoteService", function($http, $q, FIREBASE_CONFIG){

    const getMovieQuoteFromDB = () => {
        let movieQuote = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`).then((results) => {
                let fbMovieQuotes = results.data;
                Object.keys(fbMovieQuotes).forEach((key) => {
                    fbMovieQuotes[key].id = key;
                    movieQuote.push(fbMovieQuotes[key]);
                });
                let rand = movieQuote[Math.floor(Math.random() * movieQuote.length)];
                resolve(rand);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const searchMovieQuotes = (query) => {
        let queriedMovieQuote = [];
        
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`).then((results) => {
                let fbQueriedMovieQuotes = results;
                $.each(results.data, function (idx, movieQuote) { 
                    if (movieQuote.quote.includes(query)) {
                        queriedMovieQuote.push(movieQuote);
                    }
                });
                resolve(queriedMovieQuote);
            }).catch((error) => {
                console.log("error in searchMovieQuotes", error);
            });
        });
    };

    return {getMovieQuoteFromDB, searchMovieQuotes};

});