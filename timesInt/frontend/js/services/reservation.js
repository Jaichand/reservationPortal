angular.module('reservation')
.factory('User', function($resource, $http, $rootScope, $location) {
   var res;
   res = $resource('http://localhost:8080/api/reservation/:id', {
     "id": "@id"
   }, {
      getAllReseravtion: {
        url: 'http://localhost:8080/api/getAllReseravtion',
        method: 'GET'
      },
      addReservation: {
        url: 'http://localhost:8080/api/addReservation',
        method: 'POST'
     },
     deleteRes: {
      url: 'http://localhost:8080/api/deleteRes',
      method: 'POST'
     },
     editResrvation: {
        url: 'http://localhost:8080/api/editRow',
        method: 'POST'
     }
 });
return res;
});