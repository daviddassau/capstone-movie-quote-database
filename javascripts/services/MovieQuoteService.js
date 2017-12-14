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

    const getAllMovieQuotes = () => {
        let movieQuote = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`).then((results) => {
                // old code
                $.each(results.data, function(idx, mvieQte){
                    movieQuote.push(mvieQte);
                });
                // new code
                // let fbAllMovieQuotes = results.data;
                // Object.keys(fbAllMovieQuotes).forEach((key) => {
                //     fbAllMovieQuotes[key].id = key;
                //     movieQuote.push(fbAllMovieQuotes[key]);
                // });
                resolve(movieQuote);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    // Try it out
    const getMovieQuoteForSaved = (uid) => {
        let savedMovieQuote = [];
        console.log("uid", uid);
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json?orderBy="uid"&equalTo="${uid}"`).then((results) => {
                let fbSavedMovieQuotes = results.data;
                Object.keys(fbSavedMovieQuotes).forEach((key) => {
                    if (fbSavedMovieQuotes[key].isFavorited) {
                        fbSavedMovieQuotes[key].id = key;
                        savedMovieQuote.push(fbSavedMovieQuotes[key]);
                    }
                });
                resolve(savedMovieQuote);
            }).catch((error) => {
                reject(error);
            });
        });
    };
    // end Try it out

    const searchMovieQuotes = (query) => {
        let queriedMovieQuote = [];
        
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`).then((results) => {
                // old code
                let fbQueriedMovieQuotes = results;
                $.each(results.data, function (idx, movieQuote) { 
                    if (movieQuote.quote.includes(query)) {
                        queriedMovieQuote.push(movieQuote);
                    }
                });
                // new code
                let fbQueriedMovieQuotes = results;
                Object.keys(fbQueriedMovieQuotes).forEach((key) => {
                    if (movieQuote.quote.includes(query)){
                        queriedMovieQuote.push(movieQuote);
                    }
                });
                resolve(queriedMovieQuote);
            }).catch((error) => {
                console.log("error in searchMovieQuotes", error);
            });
        });
    };

    const editMovieQuote = (quote, movieQuote) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/movieQuotes/${movieQuote}.json`, JSON.stringify(quote));
    };

    const createMovieQuoteObject = (movieQuote) => {
        return {
            "quote": movieQuote.quote,
            "character": movieQuote.character,
            "uid": movieQuote.uid,
            "movieId": movieQuote.movieId,
            "isFavorited": true
        };
    };

    // Promise for saving a movie quote
    const saveMovieQuote = () => {

    };

    const addNewMovieQuote = (movieQuote) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`, JSON.stringify(movieQuote));
    };

    const getSingleMovieQuoteToEdit = (movieId) => {
        let singleMovieQuote = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json?orderBy="movieId"&equalTo="${movieId}"`).then((result) => {
                let fbMovieQuote = result.data;
                Object.keys(fbMovieQuote).forEach((key) => {
                    fbMovieQuote[key].id = key;
                    singleMovieQuote.push(fbMovieQuote[key]);
                });
                resolve(singleMovieQuote);
            }).catch((error) => {

            });
        });

    };

    return {getMovieQuoteFromDB, searchMovieQuotes, editMovieQuote, createMovieQuoteObject, getMovieQuoteForSaved, addNewMovieQuote, getAllMovieQuotes, getSingleMovieQuoteToEdit};

});