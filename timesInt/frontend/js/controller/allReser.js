angular.module('reservation')
.controller('AllReserCtrl', ['$scope','User', '$location',
 function($scope, User, $location) {
  console.log("yeahs I am calling here?");
  $scope.user = {};
  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
  $scope.getAllReseravtion = function(data) {
    User.getAllReseravtion(data).$promise
    .then(function(res) {
      console.log('Here is the response', res.reservations);
      $scope.allReseravation = res.reservations;
    })
    .catch(function(err) {
      console.log('Error while fetching Reservations', err);
    });
  }
  $scope.getAllReseravtion();
  $scope.createdRese = function() {
    console.log('Calling tis?');
    $location.url('/addReservation');
  }

  $scope.delete = function(resv) {
    console.log('deleting', resv);
    if(resv._id) {
      User.deleteRes({id: resv._id}).$promise
      .then(function(res){
        console.log('Deleted?');
        $scope.getAllReseravtion();
      })
      .catch(function(err) {
        console.log('Erro when Deleting', err);
      })
    }
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.filterDate = function() {
    console.log('see the dates greater', $scope.greater,'lesser', $scope.lesser);
    let obj = {
      filter: true,
      greater: $scope.greater,
      lesser: $scope.lesser
    }
    $scope.getAllReseravtion(obj);
  }
  $scope.editrow = function(resv) {
    resv.edit = true;
    $scope.editRow = JSON.parse(JSON.stringify(resv));
    console.log('Edit this row', $scope.editRow);
  }

  $scope.saveRow = function(resv, old) {
    old.edit = false;
    User.editResrvation(resv).$promise
    .then(function(res) {
      console.log('edited succesfully', res);
      $scope.getAllReseravtion();
    })
    .catch(function(err) {
      console.log('Error while Editing', err);
    });
    console.log('save this row');
  }
}]);