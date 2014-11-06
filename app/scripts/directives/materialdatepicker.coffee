app = angular.module('materialDatePickerApp')
app.directive('mdDatePicker', ['$datepicker', ($datepicker)->
  templateUrl: '/views/directives/datepicker.html'
  restrict: 'E'
  scope: {
    lineColor: '@'
    textColor: '@'
    mask: '@'
  }
  link: (scope, element, attrs) ->
    if scope.textColor
      $('#date-picker').attr('style', 'color:' + scope.textColor + '!important')
    return;
])
