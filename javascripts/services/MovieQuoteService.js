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
                let fbAllMovieQuotes = results.data;
                Object.keys(fbAllMovieQuotes).forEach((key) => {
                    fbAllMovieQuotes[key].id = key;
                    movieQuote.push(fbAllMovieQuotes[key]);
                });
                resolve(movieQuote);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const searchMovieQuotes = (query) => {
        let queriedMovieQuote = [];
        
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`).then((results) => {
                let fbQueriedMovieQuotes = results.data;
                Object.keys(fbQueriedMovieQuotes).forEach((key) => {
                    if (fbQueriedMovieQuotes[key].quote.toLowerCase().includes(query.toLowerCase())){
                        queriedMovieQuote.push(fbQueriedMovieQuotes[key]);
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

    // For Save Movie Quote
    const getMovieQuoteForSaved = (uid) => {
        let savedMovieQuote = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/userQuotes.json?orderBy="uid"&equalTo="${uid}"`).then((results) => {
                let fbSavedMovieQuotes = results.data;
                Object.keys(fbSavedMovieQuotes).forEach((key) => {
                    fbSavedMovieQuotes[key].id = key;
                    savedMovieQuote.push(fbSavedMovieQuotes[key]);
                });
                resolve(savedMovieQuote);
            }).catch((error) => {
                reject(error);
            });
        });
    };
    // end Save Movie Quote

    const updateUserMovieQuote = (quote) => {
        let updatedMovieQuote = createUserMovieQuoteObject(quote);
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/userQuotes.json`, JSON.stringify(updatedMovieQuote));
    };

    const createUserMovieQuoteObject = (movieQuote) => {
        return {
            "uid": movieQuote.uid,
            "quoteId": movieQuote.id
        };
    };

    const getSingleQuote = (quoteId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes/${quoteId}.json`, JSON.stringify());
    };

    const getSingleMovie = (movieId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/movies/${movieId}.json`, JSON.stringify());
    };

    return {getMovieQuoteFromDB,
            searchMovieQuotes, 
            editMovieQuote, 
            createMovieQuoteObject, 
            getMovieQuoteForSaved, 
            addNewMovieQuote, 
            getAllMovieQuotes, 
            getSingleMovieQuoteToEdit, 
            updateUserMovieQuote, 
            getSingleQuote,
            getSingleMovie
        };

});