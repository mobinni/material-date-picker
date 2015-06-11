(function() {
  'use strict';

  /**
    * By Mo Binni
   */
  var app, contains;

  app = angular.module('materialDatePicker', []);

  contains = function(container, contained) {
    var node;
    node = contained.parentNode;
    while (node !== null && node !== container) {
      node = node.parentNode;
    }
    return node !== null;
  };

  app.directive("outsideClick", [
    '$document', '$parse', function($document, $parse) {
      return {
        link: function($scope, $element, $attributes) {
          var onDocumentClick, scopeExpression;
          scopeExpression = $attributes.outsideClick;
          onDocumentClick = function(event) {
            if (!contains($element[0], event.target)) {
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
          inputClass: '@',
          inputName: '@',
          placeholder: '@',
          arrows: '=?',
          calendarHeader: '=?'
        },
        template: '<div id="dateSelectors" class="date-selectors"  outside-click="hidePicker()"> <input name="{{ inputName }}" type="text" class="mb-input-field"  ng-click="showPicker()"  class="form-control"  ng-model="date" placeholder="{{ placeholder }}"> <div class="mb-datepicker" ng-show="isVisible"> <table> <caption> <div class="header-year-wrapper"> <span style="display: inline-block; float: left; padding-left:20px; cursor: pointer" class="noselect" ng-click="previousYear(currentDate)"><img style="height: 10px;" ng-src="{{ arrows.year.left }}"/></span> <span class="header-year noselect" ng-class="noselect">{{ year }}</span> <span style="display: inline-block; float: right; padding-right:20px; cursor: pointer" class="noselect" ng-click="nextYear(currentDate)"><img style="height: 10px;" ng-src="{{ arrows.year.right }}"/></span> </div> <div class="header-nav-wrapper"> <span class="header-item noselect" style="float: left; cursor:pointer" ng-click="previousMonth(currentDate)"><img style="height: 10px;" ng-src="{{ arrows.month.left }}"/></span> <span class="header-month noselect">{{ month }}</span> <span class="header-item header-right noselect" style="float: right; cursor:pointer" ng-click="nextMonth(currentDate)"> <img style="height: 10px;" ng-src="{{ arrows.month.right }}"/></span> </div> </caption> <tbody> <tr> <td class="day-head">{{ calendarHeader.monday }}</td> <td class="day-head">{{ calendarHeader.tuesday }}</td> <td class="day-head">{{ calendarHeader.wednesday }}</td> <td class="day-head">{{ calendarHeader.thursday }}</td> <td class="day-head">{{ calendarHeader.friday }}</td> <td class="day-head">{{ calendarHeader.saturday }}</td> <td class="day-head">{{ calendarHeader.sunday }}</td> </tr> <tr class="days" ng-repeat="week in weeks"> <td ng-click="selectDate(day)" class="noselect" ng-class="day.class" ng-repeat="day in week">{{ day.value.format(\'DD\') }}</td> </tr> </tbody> </table> </div> </div>',
        restrict: 'E',
        transclude: true,
        link: function(scope, element, attrs) {
          var getWeeks, init, selectors, today;
          console.log(scope.calendarHeader);
          selectors = document.querySelector('#dateSelectors');
          today = moment();
          scope.month = '';
          scope.year = today.year();
          if (scope.inputClass) {
            selectors.className = selectors.className + " " + scope.inputClass;
          }
          if (!scope.dateFormat) {
            scope.dateFormat = "YYYY-MM-DD";
          }
          if (scope.minDate) {
            scope.minDate = moment(scope.minDate, scope.dateFormat);
          }
          if (scope.maxDate) {
            scope.maxDate = moment(scope.maxDate, scope.dateFormat);
          }
          if (!scope.calendarHeader) {
            scope.calendarHeader = {
              monday: 'Mon',
              tuesday: 'Tue',
              wednesday: 'Wed',
              thursday: 'Thu',
              friday: 'Fri',
              saturday: 'Sat',
              sunday: 'Sun'
            };
          }
          if (!scope.arrows) {
            scope.arrows = {
              year: {
                left: 'images/white_arrow_left.svg',
                right: 'images/white_arrow_right.svg'
              },
              month: {
                left: 'images/grey_arrow_left.svg',
                right: 'images/grey_arrow_right.svg'
              }
            };
          }
          getWeeks = function(monthLength, startDay, month) {
            var chunk_size, day, j, monthDays, newDate, ref, start, weeks;
            monthDays = [];
            for (day = j = 0, ref = monthLength; 0 <= ref ? j <= ref : j >= ref; day = 0 <= ref ? ++j : --j) {
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
