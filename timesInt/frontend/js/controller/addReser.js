angular.module('reservation')
.controller('addReservationCtrl', ['$scope','$location', 'User',
 function($scope, $location, User) {
   console.log('Adding is callig?');
  function checkValidator() {
    console.log('$scope.reservation', $scope.reservation);
    if(
      $scope.reservation.firstName && 
      $scope.reservation.email && 
      $scope.reservation.noOfGuests && 
      $scope.reservation.reservedOn
      && $scope.reservation.comments) {
        console.log('$scope.reservation', $scope.reservation);
        $scope.messege = '';
        return true;
      }
  }

  $scope.reservation = {
    firstName: undefined,
    lastName: undefined,
    email:undefined,
    noOfGuests: 0,
    reservedOn: undefined,
    comments: undefined
  };
  $scope.canBeSave = false;
  $scope.addReservation = function() {
   
    $scope.canBeSave = checkValidator();
    if($scope.canBeSave) {
      User.addReservation($scope.reservation).$promise
      .then(function(reservation) {
        console.log('reservation', reservation)
        $location.url('/home');
      })
      .catch(function(err) {
        console.log('Erro while adding res', err);
      })
    } else {
      $scope.messege = "Please fill all Values";
      if(!$scope.reservation.email) {
        $scope.messege = "PLease provide valid Email";
      }
    }
  }
  
  $scope.viewRes = function() {
    $location.url('/home');
  }
}]);