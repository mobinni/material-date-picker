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
    function() {
      return {
        template: '<div class="md-toolbar-tools dark">' + ' <md-input-group ng-disabled="isDisabled">' + '     <label>{{label}}</label>' + '    <md-input id="date-picker" model-view-value="true" ng-model="value" data-date-format="{{ mask }}" bs-datepicker></md-input>' + '</md-input-group>' + '</div>',
        restrict: 'E',
        scope: {
          lineColor: "@",
          textColor: "@",
          mask: "@"
        },
        link: function(scope, element, attrs) {
          var picker;
          picker = element.find("#date-picker");
          if (scope.textColor) {
            picker.prepend('<style type="text/css"> #date-picker { color:' + scope.textColor + '!important; border-color:' + scope.lineColor + '!important; } </style>')("color", scope.textColor, "important");
          }
        }
      };
    }
  ]);

}).call(this);
