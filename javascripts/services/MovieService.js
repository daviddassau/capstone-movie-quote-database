"use strict";

app.service("MovieService", function($http, $q, FIREBASE_CONFIG){

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

    return {getMovieFromDB};

});