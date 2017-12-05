"use strict";

app.config(function ($routeProvider) {
    $routeProvider
        .when("/auth", {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl'
        })
        .when("/home", {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            resolve: { isAuth }
        })
        .when("/search", {
            templateUrl: 'partials/search.html',
            controller: 'SearchCtrl',
            resolve: { isAuth }
        })
        .when("/submit", {
            templateUrl: 'partials/submit.html',
            controller: 'SubmitCtrl',
            resolve: { isAuth }
        })
        .when("/saved", {
            templateUrl: 'partials/saved.html',
            controller: 'SavedCtrl',
            resolve: { isAuth }
        })
        .when("/about", {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl',
            resolve: { isAuth }
        })
        .otherwise('/auth');
});