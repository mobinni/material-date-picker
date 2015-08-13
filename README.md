## Angular material datepicker
![Alt text](http://i.imgur.com/dexQ7sd.png)


This small component is still in currently in BETA. It's a simple date picker based on the angular-material port of polymer by the people behind ionic.

The master branch will always contain the most recent version of the datepicker, so if you want to be up to date, don't pull from bower of npm. These are the stable versions.

https://material.angularjs.org/

##Install
This component is bower and npm registered 
```css
bower install material-date-picker (installs moment as dependency)
npm install material-date-picker
npm install moment
```
All the necessary files will be automatically included in your index.html if not add
```css
    <link rel="stylesheet" href="bower_components/material-date-picker/build/styles/mbdatepicker.css"/>
    <script src="bower_components/material-date-picker/build/mbdatepicker.js"></script>
```
You have to add a dependency to material-date-picker module which is called `materialDatePicker`.
````js
angular.module('your-app', ['materialDatePicker']);
````
##Usage
###Attributes
```html
	<mb-datepicker element-id='date1'
	               input-class="testClass"
	               input-name="testName"
	               arrows="arrows"
	               calendar-header="header"
	               date="date"
	               date-format="YYYY-MM-DD"></mb-datepicker>
```

With the following attributes you can bind an element id, bind a class for extra styling to the input and all internal fields, etc.
The calendar-header attribute has a two-way databinding to a scope variable, so you can add dynamic translations, that has the following setup:
```javascript
    $scope.header = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
    }
```

The arrows attribute has a two-way databinding to a scope variable that has the following setup:
```javascript
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
```

The input-class attribute can be overridden in the following way: 
```css
<style type="text/css">
	.testClass > input {
		border-bottom: 3px solid #1A4987;
		border-left: transparent;
		border-right: transparent;
		border-top: transparent;
	}
</style>
```


An example is provided.

##Known issues
If you can't find the SVG images, look in the images map of the bower component and copy these to your own images map. I left this as an open option.


If you have an improvement or request please let me know or post a pull request
