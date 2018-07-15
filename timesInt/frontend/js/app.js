//reservation
var app = angular.module('reservation', [
    'ngRoute',
    'ui.bootstrap.tpls',
    'ui.bootstrap',
    'ngResource'
]);
app.config(['$routeProvider', '$httpProvider' ,function($routeProvider, $httpProvider){
    $routeProvider
    .when('/home', {
        templateUrl : 'templates/allReservation.html',
        controller: 'AllReserCtrl'
    })
    .when('/addReservation', {
        templateUrl : 'templates/addReservation.html',
        controller: 'addReservationCtrl'
    })
    .otherwise("/home");
}]);