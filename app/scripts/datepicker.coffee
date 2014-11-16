'use strict'

###*
 # @ngdoc overview
 # @name materialDatePickerApp
 # @description
 # # materialDatePickerApp
 #
 # Main module of the application.
###
app = angular
  .module('materialDatePicker', [
    'mgcrea.ngStrap',
    'ngMaterial',
    'ui.utils'
  ])

app.directive('mdDatePicker', ['$datepicker', ($datepicker)->
    template: '<div class="md-toolbar-tools dark">' +
      ' <md-input-group ng-disabled="isDisabled">' +
      '     <label>{{label}}</label>' +
      '    <md-input id="date-picker" model-view-value="true"' +
      '             ng-model="value" bs-datepicker></md-input>' +
      '</md-input-group>' +
      '</div>'
    restrict: 'E'
    scope:
      lineColor: "@"
      textColor: "@"
      mask: "@"

    link: (scope, element, attrs) ->
      picker = $("#date-picker")
      picker.css "color", scope.textColor, "important"  if scope.textColor
      picker.css "border-color", scope.lineColor, "important"  if scope.lineColor
      return
])
