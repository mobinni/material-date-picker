'use strict';

/**
 * @ngdoc function
 * @name workingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the workingApp
 */
angular.module('workingApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
