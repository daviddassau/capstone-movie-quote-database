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
                $.each(results.data, function(idx, mvie){
                    if(mvie.movieDatabaseId == movieDatabaseId){
                        movie.push(mvie);

                        addedMovie = mvie;
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

    return { getMovieFromDB, getMovieByMovieDbIdFromDB, getAddedMovie, setAddedMovie};

});