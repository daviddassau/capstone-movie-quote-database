"use strict";

app.service("MovieQuoteService", function($http, $q, FIREBASE_CONFIG){

    const getMovieQuoteFromDB = (userUid) => {
        let movieQuote = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
                let fbMovieQuotes = results.data;
                Object.keys(fbMovieQuotes).forEach((key) => {
                    fbMovieQuotes[key].id = key;
                    movieQuote.push(fbMovieQuotes[key]);
                });
                resolve(movieQuote);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    return {getMovieQuoteFromDB};

});