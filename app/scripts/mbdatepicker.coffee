'use strict'

###*
 # By Mo Binni
###
app = angular.module('materialDatePicker', [])

contains = (container, contained) ->
  node = contained.parentNode
  while (node != null && node != container)
    node = node.parentNode
  node != null

app.directive("outsideClick", ['$document', '$parse', ($document, $parse) ->
  link: ($scope, $element, $attributes) ->
    scopeExpression = $attributes.outsideClick
    onDocumentClick = (event) ->
      $scope.$apply scopeExpression unless contains($element[0], event.target)
      return
    $document.on "click", onDocumentClick
    $element.on "$destroy", ->
      $document.off "click", onDocumentClick
      return
    return
])
app.directive('mbDatepicker', [()->
  scope: {
    elementId: '@',
    date: '=',
    dateFormat: '@'
    minDate: '@'
    maxDate: '@'
    inputClass: '@'
    inputName: '@'
    placeholder: '@'
    arrows: '=?'
    calendarHeader: '=?'
  }
  template: '
            <div id="dateSelectors" class="date-selectors"  outside-click="hidePicker()">
                    <input name="{{ inputName }}" type="text" class="mb-input-field"  ng-click="showPicker()"  class="form-control"  ng-model="date" placeholder="{{ placeholder }}">
                    <div class="mb-datepicker" ng-show="isVisible">
                        <table>
                            <caption>
                              <div class="header-year-wrapper">
                                  <span style="display: inline-block; float: left; padding-left:20px; cursor: pointer" class="noselect" ng-click="previousYear(currentDate)"><img style="height: 10px;" ng-src="{{ arrows.year.left }}"/></span>
                                  <span class="header-year noselect" ng-class="noselect">{{ year }}</span>
                                  <span style="display: inline-block; float: right; padding-right:20px; cursor: pointer" class="noselect" ng-click="nextYear(currentDate)"><img style="height: 10px;" ng-src="{{ arrows.year.right }}"/></span>
                              </div>
                              <div class="header-nav-wrapper">
                                  <span class="header-item noselect" style="float: left; cursor:pointer" ng-click="previousMonth(currentDate)"><img style="height: 10px;" ng-src="{{ arrows.month.left }}"/></span>
                                  <span class="header-month noselect">{{ month }}</span>
                                  <span class="header-item header-right noselect" style="float: right; cursor:pointer" ng-click="nextMonth(currentDate)"> <img style="height: 10px;" ng-src="{{ arrows.month.right }}"/></span>
                              </div>
                            </caption>
                            <tbody>
                              <tr>
                                <td class="day-head">{{ calendarHeader.monday }}</td>
                                <td class="day-head">{{ calendarHeader.tuesday }}</td>
                                <td class="day-head">{{ calendarHeader.wednesday }}</td>
                                <td class="day-head">{{ calendarHeader.thursday }}</td>
                                <td class="day-head">{{ calendarHeader.friday }}</td>
                                <td class="day-head">{{ calendarHeader.saturday }}</td>
                                <td class="day-head">{{ calendarHeader.sunday }}</td>
                              </tr>
                              <tr class="days" ng-repeat="week in weeks">
                                <td ng-click="selectDate(day)" class="noselect" ng-class="day.class" ng-repeat="day in week">{{ day.value.format(\'DD\') }}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
'
  restrict: 'E',
  transclude: true,
  link: (scope, element, attrs) ->
    console.log scope.calendarHeader
# Vars
    selectors = document.querySelector('#dateSelectors')
    today = moment()
    scope.month = '';
    scope.year = today.year();

    # Casual definition
    if scope.inputClass then selectors.className = selectors.className + " " + scope.inputClass
    if !scope.dateFormat then scope.dateFormat = "YYYY-MM-DD"
    if scope.minDate then scope.minDate = moment(scope.minDate, scope.dateFormat)
    if scope.maxDate then scope.maxDate = moment(scope.maxDate, scope.dateFormat)
    if !scope.calendarHeader then scope.calendarHeader = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    }

    if !scope.arrows then scope.arrows = {
      year: {
        left: 'images/white_arrow_left.svg',
        right: 'images/white_arrow_right.svg'
      },
      month: {
        left: 'images/grey_arrow_left.svg',
        right: 'images/grey_arrow_right.svg'
      }
    }

    # Datepicker logic to get weeks
    getWeeks = (monthLength, startDay, month) ->
      monthDays = []
      # Iterate over other dates
      for day in [0..monthLength]
        start = moment(startDay)
        newDate = start.add(day, 'd')
        if(scope.minDate and moment(newDate, scope.dateFormat) <= moment(scope.minDate, scope.dateFormat))
          monthDays.push({value: newDate, isToday: true, isEnabled: false, class: 'disabled'})
        else if(scope.maxDate and moment(newDate, scope.dateFormat) >= moment(scope.maxDate, scope.dateFormat))
          monthDays.push({value: newDate, isToday: true, isEnabled: false, class: 'disabled'})
        else if newDate.format(scope.dateFormat) == moment().format(scope.dateFormat)
          monthDays.push({value: newDate, isToday: true, isEnabled: true, class: 'day-item today'})
        else if(newDate.month() == month)
          monthDays.push({value: newDate, isToday: false, isEnabled: true, class: 'day-item day'})
        else if(newDate.day() == 0 || newDate.day() == 6)
          monthDays.push({value: newDate, isToday: false, isEnabled: true, class: 'day-item weekend'})
        else
          monthDays.push({value: newDate, isToday: false, isEnabled: true, class: 'day-item'})
      chunk_size = 7;

      # Map reduce by 7 days per week
      weeks = monthDays.map((e, i) ->
        if i % chunk_size == 0 then monthDays.slice(i, i + chunk_size)
        else null;
      ).filter((e) ->
        return e;
      );
      if weeks then return weeks
      else return []

    # Logic to get the following month
    scope.nextMonth = (date) ->
      next_month = moment(date).date(0)
      last_day = moment(next_month).add(4, 'months').date(0)
      scope.year = last_day.year()
      if(last_day.day() != 7)
        last_day = last_day.add(7 - last_day.day(), 'days')
      first_day = moment(next_month).add(2, 'months').startOf('isoweek')
      scope.currentDate = first_day
      scope.weeks = []
      scope.weeks = getWeeks(
        last_day.diff(first_day, 'days'),
        first_day,
        next_month.add(3, 'months').month()
      )
      scope.month = (next_month.format('MMMM'))

    # Logic to get the previous month
    scope.previousMonth = (date) ->
      last_month = moment(date).date(0)
      last_day = moment(last_month).add(2, 'months').date(0)
      scope.year = last_day.year()
      if(last_day.day() != 7)
        last_day = last_day.add(7 - last_day.day(), 'days')
      first_day = moment(last_month).startOf('isoweek')
      scope.currentDate = first_day
      scope.weeks = []
      scope.weeks = getWeeks(
        last_day.diff(first_day, 'days'),
        first_day,
        last_month.add(1, 'months').month()
      )
      scope.month = (last_month.format('MMMM'))

    # Logic to get the next year
    scope.nextYear = (date) ->
      next_month = moment(date).date(0)
      last_day = moment(next_month).add(1, 'year').add(3, 'months').date(0)
      scope.year = last_day.year()
      if(last_day.day() != 7)
        last_day = last_day.add(7 - last_day.day(), 'days')
      first_day = moment(next_month).add(1, 'years').add(1, 'months').startOf('isoweek')
      scope.currentDate = first_day
      scope.weeks = []
      scope.weeks = getWeeks(
        last_day.diff(first_day, 'days'),
        first_day,
        next_month.add(2, 'months').month()
      )
      scope.month = (next_month.format('MMMM'))

    # Logic to get the previous year
    scope.previousYear = (date) ->
      last_month = moment(date).date(0)
      last_day = moment(last_month).subtract(1, 'years').add(3, 'months').date(0)
      scope.year = last_day.year()
      if(last_day.day() != 7)
        last_day = last_day.add(7 - last_day.day(), 'days')
      first_day = moment(last_month).subtract(1, 'years').add(1, 'months').startOf('isoweek')
      scope.currentDate = first_day
      scope.weeks = []
      scope.weeks = getWeeks(
        last_day.diff(first_day, 'days'),
        first_day,
        last_month.add(2, 'months').month()
      )
      scope.month = (last_month.format('MMMM'))

    # Logic to hide the view if a date is selected
    scope.selectDate = (day) ->
      if day.isEnabled
        scope.date = day.value.format(scope.dateFormat)
        scope.isVisible = false;


    scope.isVisible = false
    scope.showPicker = ->
      scope.isVisible = true
      return

    scope.hidePicker = ->
      scope.isVisible = false
      return

    init = ->
# First day of month
      firstMonday = moment(moment().date(today.month())).startOf('isoweek')
      if(firstMonday.format('DD') != '01') then firstMonday.subtract(1, 'weeks')

      # No. of days in month
      days = moment(moment().date(today.month())).daysInMonth()

      # Last day of month
      endDate = moment().add(1, 'months').date(0);
      scope.month = (endDate.format('MMMM'))

      # Check if last date is sunday, else add days to get to Sunday
      if(endDate.day() != 7)
        endDate = endDate.add(7 - endDate.day(), 'days')

      scope.currentDate = firstMonday
      scope.weeks = getWeeks(
# No. of days in a month from sunday to sunday
        endDate.diff(firstMonday, 'days'),
        firstMonday,
        today.month()
      )
    init()


])
