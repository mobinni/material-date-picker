(function() {
  var app;

  app = angular.module('materialDatePicker');

  app.directive('mdDatePicker', [
    '$datepicker', function($datepicker) {
      return {
        templateUrl: '/views/directives/datepicker.html',
        restrict: 'E',
        scope: {
          lineColor: '@',
          textColor: '@',
          mask: '@'
        },
        link: function(scope, element, attrs) {
          if (scope.textColor) {
            $('#date-picker').attr('style', 'color:' + scope.textColor + '!important');
          }
        }
      };
    }
  ]);

}).call(this);
