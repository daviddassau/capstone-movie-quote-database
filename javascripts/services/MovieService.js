"use strict";

app.service("MovieService", function($http, $q, FIREBASE_CONFIG){

    let addedMovie = {};

    const getMovieFromDB = (movieId) => {
        let movie = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json?orderBy="$key"&equalTo="${movieId}"`).then((results) => {
                let fbMovie = results.data;
                movie.push(fbMovie[movieId]);
                resolve(movie);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getMovieByMovieDbIdFromDB = (movieDatabaseId) => {
        let movie = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json`).then((results) => {
                let fbMovies = results.data;
                Object.keys(fbMovies).forEach((key) => {
                    if (fbMovies[key].movieDatabaseId === movieDatabaseId) {
                        fbMovies[key].id = key;
                        movie.push(fbMovies[key]);
                        addedMovie = fbMovies[key];
                    }
                });
                resolve(movie);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    let getAddedMovie = () => {
        return addedMovie;
    };

    let setAddedMovie = (movie) => {
        addedMovie = movie;
    };

    const createMovieObject = (movie) => {
        return {
            "movieDatabaseId": movie.id,
            "poster_path": movie.poster_path,
            "releaseDate": movie.release_date,
            "title": movie.original_title
        };
    };

    const addNewMovie = (movie) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/movies.json`, JSON.stringify(movie)).then((result) => {
                movie.id = result.data.name;
                addedMovie = movie;
                resolve(movie);
            }).catch((error) => {
                console.log("error in addNewMovie", error);
                reject(error);
            });
        });
    };

    return {getMovieFromDB, getMovieByMovieDbIdFromDB, getAddedMovie, setAddedMovie, createMovieObject, addNewMovie};

});