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

  app = angular.module('materialDatePicker', []);

  app.directive("outsideClick", [
    '$document', '$parse', function($document, $parse) {
      return {
        link: function($scope, $element, $attributes) {
          var onDocumentClick, scopeExpression;
          scopeExpression = $attributes.outsideClick;
          onDocumentClick = function(event) {
            var isChild;
            isChild = $element.find(event.target.tagName).length > 0;
            if (!isChild) {
              $scope.$apply(scopeExpression);
            }
          };
          $document.on("click", onDocumentClick);
          $element.on("$destroy", function() {
            $document.off("click", onDocumentClick);
          });
        }
      };
    }
  ]);

  app.directive('mbDatepicker', [
    function() {
      return {
        scope: {
          elementId: '@',
          date: '=',
          dateFormat: '@',
          minDate: '@',
          maxDate: '@',
          dateMessage: '@',
          textColor: '@',
          lineColor: '@'
        },
        template: '<div class="date-selectors"  outside-click="hidePicker()"> <input type="text" class="mb-input-field"  ng-click="showPicker()"  class="form-control"  ng-model="date" placeholder="Pick a date"> <div class="mb-datepicker" ng-show="isVisible"> <table> <caption> <div class="header-year-wrapper"> <span style="display: inline-block; float: left; padding-left:20px; cursor: pointer" class="noselect" ng-click="previousYear(currentDate)"><img style="height: 10px;" src="images/white_arrow_left.svg"/></span> <span class="header-year noselect" ng-class="noselect">{{ year }}</span> <span style="display: inline-block; float: right; padding-right:20px; cursor: pointer" class="noselect" ng-click="nextYear(currentDate)"><img style="height: 10px;" src="images/white_arrow_right.svg"/></span> </div> <div class="header-nav-wrapper"> <span class="header-item noselect" style="float: left; cursor:pointer" ng-click="previousMonth(currentDate)"><img style="height: 10px;" src="images/grey_arrow_left.svg"/></span> <span class="header-month noselect">{{ month }}</span> <span class="header-item header-right noselect" style="float: right; cursor:pointer" ng-click="nextMonth(currentDate)"> <img style="height: 10px;" src="images/grey_arrow_right.svg"/></span> </div> </caption> <tbody> <tr> <td class="day-head">Mon</td> <td class="day-head">Tue</td> <td class="day-head">Wed</td> <td class="day-head">Thu</td> <td class="day-head">Fri</td> <td class="day-head">Sat</td> <td class="day-head">Sun</td> </tr> <tr class="days" ng-repeat="week in weeks"> <td ng-style="day.isToday" ng-click="selectDate(day)" class="noselect" ng-class="day.class" ng-repeat="day in week">{{ day.value.format(\'DD\') }}</td> </tr> </tbody> </table> </div> </div>',
        restrict: 'E',
        transclude: true,
        link: function(scope, element, attrs) {
          var getWeeks, init, today;
          element.find('.date-selectors').prepend('<style> .mb-input-field { color:' + scope.textColor + '; border-color:' + scope.lineColor + '; border-left: 0px; border-right: 0px; border-top: 0px; } </style>');
          today = moment();
          scope.month = '';
          scope.year = today.year();
          if (!scope.dateFormat) {
            scope.dateFormat = "YYYY-MM-DD";
          }
          if (scope.minDate) {
            scope.minDate = moment(scope.minDate, scope.dateFormat);
          }
          if (scope.maxDate) {
            scope.maxDate = moment(scope.maxDate, scope.dateFormat);
          }
          getWeeks = function(monthLength, startDay, month) {
            var chunk_size, day, monthDays, newDate, start, weeks, _i;
            monthDays = [];
            for (day = _i = 0; 0 <= monthLength ? _i <= monthLength : _i >= monthLength; day = 0 <= monthLength ? ++_i : --_i) {
              start = moment(startDay);
              newDate = start.add(day, 'd');
              if (scope.minDate && moment(newDate, scope.dateFormat) <= moment(scope.minDate, scope.dateFormat)) {
                monthDays.push({
                  value: newDate,
                  isToday: true,
                  isEnabled: false,
                  "class": 'disabled'
                });
              } else if (scope.maxDate && moment(newDate, scope.dateFormat) >= moment(scope.maxDate, scope.dateFormat)) {
                monthDays.push({
                  value: newDate,
                  isToday: true,
                  isEnabled: false,
                  "class": 'disabled'
                });
              } else if (newDate.format(scope.dateFormat) === moment().format(scope.dateFormat)) {
                monthDays.push({
                  value: newDate,
                  isToday: true,
                  isEnabled: true,
                  "class": 'day-item today'
                });
              } else if (newDate.month() === month) {
                monthDays.push({
                  value: newDate,
                  isToday: false,
                  isEnabled: true,
                  "class": 'day-item day'
                });
              } else if (newDate.day() === 0 || newDate.day() === 6) {
                monthDays.push({
                  value: newDate,
                  isToday: false,
                  isEnabled: true,
                  "class": 'day-item weekend'
                });
              } else {
                monthDays.push({
                  value: newDate,
                  isToday: false,
                  isEnabled: true,
                  "class": 'day-item'
                });
              }
            }
            chunk_size = 7;
            weeks = monthDays.map(function(e, i) {
              if (i % chunk_size === 0) {
                return monthDays.slice(i, i + chunk_size);
              } else {
                return null;
              }
            }).filter(function(e) {
              return e;
            });
            if (weeks) {
              return weeks;
            } else {
              return [];
            }
          };
          scope.nextMonth = function(date) {
            var first_day, last_day, next_month;
            next_month = moment(date).date(0);
            last_day = moment(next_month).add(4, 'months').date(0);
            scope.year = last_day.year();
            if (last_day.day() !== 7) {
              last_day = last_day.add(7 - last_day.day(), 'days');
            }
            first_day = moment(next_month).add(2, 'months').startOf('isoweek');
            scope.currentDate = first_day;
            scope.weeks = [];
            scope.weeks = getWeeks(last_day.diff(first_day, 'days'), first_day, next_month.add(3, 'months').month());
            return scope.month = next_month.format('MMMM');
          };
          scope.previousMonth = function(date) {
            var first_day, last_day, last_month;
            last_month = moment(date).date(0);
            last_day = moment(last_month).add(2, 'months').date(0);
            scope.year = last_day.year();
            if (last_day.day() !== 7) {
              last_day = last_day.add(7 - last_day.day(), 'days');
            }
            first_day = moment(last_month).startOf('isoweek');
            scope.currentDate = first_day;
            scope.weeks = [];
            scope.weeks = getWeeks(last_day.diff(first_day, 'days'), first_day, last_month.add(1, 'months').month());
            return scope.month = last_month.format('MMMM');
          };
          scope.nextYear = function(date) {
            var first_day, last_day, next_month;
            next_month = moment(date).date(0);
            last_day = moment(next_month).add(1, 'year').add(3, 'months').date(0);
            scope.year = last_day.year();
            if (last_day.day() !== 7) {
              last_day = last_day.add(7 - last_day.day(), 'days');
            }
            first_day = moment(next_month).add(1, 'years').add(1, 'months').startOf('isoweek');
            scope.currentDate = first_day;
            scope.weeks = [];
            scope.weeks = getWeeks(last_day.diff(first_day, 'days'), first_day, next_month.add(2, 'months').month());
            return scope.month = next_month.format('MMMM');
          };
          scope.previousYear = function(date) {
            var first_day, last_day, last_month;
            last_month = moment(date).date(0);
            last_day = moment(last_month).subtract(1, 'years').add(3, 'months').date(0);
            scope.year = last_day.year();
            if (last_day.day() !== 7) {
              last_day = last_day.add(7 - last_day.day(), 'days');
            }
            first_day = moment(last_month).subtract(1, 'years').add(1, 'months').startOf('isoweek');
            scope.currentDate = first_day;
            scope.weeks = [];
            scope.weeks = getWeeks(last_day.diff(first_day, 'days'), first_day, last_month.add(2, 'months').month());
            return scope.month = last_month.format('MMMM');
          };
          scope.selectDate = function(day) {
            if (day.isEnabled) {
              scope.date = day.value.format(scope.dateFormat);
              return scope.isVisible = false;
            }
          };
          scope.isVisible = false;
          scope.showPicker = function() {
            scope.isVisible = true;
          };
          scope.hidePicker = function() {
            scope.isVisible = false;
          };
          init = function() {
            var days, endDate, firstMonday;
            firstMonday = moment(moment().date(today.month())).startOf('isoweek');
            if (firstMonday.format('DD') !== '01') {
              firstMonday.subtract(1, 'weeks');
            }
            days = moment(moment().date(today.month())).daysInMonth();
            endDate = moment().add(1, 'months').date(0);
            scope.month = endDate.format('MMMM');
            if (endDate.day() !== 7) {
              endDate = endDate.add(7 - endDate.day(), 'days');
            }
            scope.currentDate = firstMonday;
            return scope.weeks = getWeeks(endDate.diff(firstMonday, 'days'), firstMonday, today.month());
          };
          return init();
        }
      };
    }
  ]);

}).call(this);
