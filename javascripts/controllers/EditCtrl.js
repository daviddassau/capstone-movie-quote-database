"use strict";

app.controller("EditCtrl", function ($routeParams, $scope, MovieQuoteService){

    $scope.movieQuote = {};

    const getMovieQuoteToEdit = () => {
        MovieQuoteService.getSingleMovieQuoteToEdit($routeParams.id).then((result) => {
            console.log("result", $scope.movieQuote = result.data);
            // $scope.movieQuote = result.data;
        }).catch((error) => {
            console.log("error in getMovieQuoteToEdit", error);
        });
    };

    // const getContact = () => {
    //     ContactService.getSingleContact($routeParams.id).then((results) => {
    //         $scope.contact = results.data;
    //     }).catch((error) => {
    //         console.log("error in getContact", error);
    //     });
    // };

    getMovieQuoteToEdit();

    // $scope.updateContactInFirebase = () => {
    //     ContactService.updateContact($scope.contact, $routeParams.id).then(() => {
    //         $location.path("/contacts/view");
    //     }).catch((error) => {
    //         console.log("error in updateContactInFirebase", error);
    //     });
    // };

});