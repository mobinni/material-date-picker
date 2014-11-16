(function() {
  'use strict';

  /**
    * @ngdoc overview
    * @name materialDatePickerApp
    * @description
    * # materialDatePickerApp
    *
    * Main module of the application.
   */
  var app;

  app = angular.module('materialDatePicker', ['mgcrea.ngStrap', 'ngMaterial', 'ui.utils']);

  app.directive('mdDatePicker', [
    '$datepicker', function($datepicker) {
      return {
        template: '<div class="md-toolbar-tools dark">' + ' <md-input-group ng-disabled="isDisabled">' + '     <label>{{label}}</label>' + '    <md-input id="date-picker" model-view-value="true"' + '             ng-model="value" bs-datepicker></md-input>' + '</md-input-group>' + '</div>',
        restrict: 'E',
        scope: {
          lineColor: "@",
          textColor: "@",
          mask: "@"
        },
        link: function(scope, element, attrs) {
          var picker;
          picker = $("#date-picker");
          if (scope.textColor) {
            picker.css("color", scope.textColor, "important");
          }
          if (scope.lineColor) {
            picker.css("border-color", scope.lineColor, "important");
          }
        }
      };
    }
  ]);

}).call(this);
