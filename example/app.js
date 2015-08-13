/**
 * Created by mobinni on 22/04/15.
 */
var app = angular.module('exampleApp', [
    'materialDatePicker'
]);

app.controller('MainCtrl', function ($scope) {
    $scope.date = null;
    $scope.arrows = {
        year: {
            left: 'images/white_arrow_left.svg',
            right: 'images/white_arrow_right.svg'
        },
        month: {
            left: 'images/grey_arrow_left.svg',
            right: 'images/grey_arrow_right.svg'
        }
    }
    $scope.header = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
    }
})
