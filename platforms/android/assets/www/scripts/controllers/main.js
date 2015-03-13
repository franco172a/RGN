'use strict';

angular.module('rngApp')
  .controller('MainCtrl', function($scope) {
    
    $scope.getRandom = function(userDob) {
      var max = 59;
      var min = 1;
      var luckyNumber = userDob ? userDob.getFullYear() / 1000 : 1;
      //
      $scope.number1 = Math.floor(Math.random() * (max - min) + luckyNumber);
      $scope.number2 = CompareValues($scope.number1, luckyNumber, max, min);
      $scope.number3 = CompareValues($scope.number2, luckyNumber, max, min);
      $scope.number4 = CompareValues($scope.number3, luckyNumber, max, min);
      $scope.number5 = CompareValues($scope.number4, luckyNumber, max, min);
      $scope.powerball = Math.floor(Math.random() * (35 - min));
    };

    function CompareValues(value, luckyNumber, max, min) {
      var nextValue = Math.floor(Math.random() * (max - min) + luckyNumber);
      if (nextValue == value) {
        nextValue = Math.floor(Math.random() * (max - min) + luckyNumber);
        CompareValues(nextValue);
      }
      return nextValue;
    };
    
    var currDate = new Date();
    var date = new Date(currDate.setFullYear(currDate.getFullYear() - 18));
    $scope.datepermited = date.getUTCFullYear() + '-12-31';
  });
