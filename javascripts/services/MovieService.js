"use strict";

app.service("MovieService", function($http, $q, FIREBASE_CONFIG){

    const getMovieFromDB = (userUid) => {
        let movie = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
                let fbMovie = results.data;
                Object.keys(fbMovie).forEach((key) => {
                    fbMovie[key].id = key;
                    movie.push(fbMovie[key]);
                });
                resolve(movie);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    return {getMovieFromDB};

});