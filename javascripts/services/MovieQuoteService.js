"use strict";

app.service("MovieQuoteService", function($http, $q, FIREBASE_CONFIG){

    // Get a random movie quote from Firebase
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

    // Get all movie quotes from Firebase
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

    // This is searching Firebase when a user queries a movie quote
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

    // When a user wants to edit a movie quote
    const editMovieQuote = (quote, movieQuote) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/movieQuotes/${movieQuote}.json`, JSON.stringify(quote));
    };

    // An object that updates an existing quote in Firebase
    const createMovieQuoteObject = (movieQuote) => {
        return {
            "quote": movieQuote.quote,
            "character": movieQuote.character,
            "uid": movieQuote.uid,
            "movieId": movieQuote.movieId,
            "isFavorited": true
        };
    };

    // Adds a new movie quote to Firebase
    const addNewMovieQuote = (movieQuote) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/movieQuotes.json`, JSON.stringify(movieQuote));
    };

    // Gets a single movie quote from Firebase that needs to be edited
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

    // Gets the user's saved movie quotes from Firebase to display on saved page
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

    // From the home page, posts a new saved movie quote to user's collection in Firebase
    const updateUserMovieQuote = (quote) => {
        let updatedMovieQuote = createUserMovieQuoteObject(quote);
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/userQuotes.json`, JSON.stringify(updatedMovieQuote));
    };

    // From the home page, an object that helps post the new saved quote to the user's collection
    const createUserMovieQuoteObject = (movieQuote) => {
        return {
            "uid": movieQuote.uid,
            "quoteId": movieQuote.id
        };
    };

    // Deletes a saved movie quote from the user's collection
    const deleteUserMovieQuote = (quoteId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/userQuotes/${quoteId}.json`, JSON.stringify());
    };

    // Gets the info from the movieQuotes collection for the saved page
    const getSingleQuote = (quoteId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/movieQuotes/${quoteId}.json`, JSON.stringify());
    };

    // Gets the info from the movies collection for the saved page
    const getSingleMovie = (movieId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/movies/${movieId}.json`, JSON.stringify());
    };

    // From the search page, posts a new saved movie quote to user's collection in Firebase
    const updateUserMovieQuoteFromSearchPage = (quote) => {
        console.log("quote from search", quote);
        let updatedMovieQuoteFromSearchPage = createUserMovieQuoteObjectFromSearchPage(quote);
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/userQuotes.json`, JSON.stringify(updatedMovieQuoteFromSearchPage));
    };

    // From the serach page, an object that helps post the new saved quote to the user's collection
    const createUserMovieQuoteObjectFromSearchPage = (movieQuote) => {
        return {
            "uid": movieQuote.uid,
            "quoteId": movieQuote.id
        };
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
            getSingleMovie,
            deleteUserMovieQuote,
            updateUserMovieQuoteFromSearchPage,
            createUserMovieQuoteObjectFromSearchPage
        };

});