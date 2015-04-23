## Angular material datepicker
![Alt text](http://i.imgur.com/dexQ7sd.png)


This small component is still in production it's a simple date picker based on the angular-material port of polymer by the people behind ionic

https://material.angularjs.org/

##Install
This component is bower and npm registered 
```css
bower install material-date-picker
npm install material-date-picker
```
All the necessary files will be automatically included in your index.html if not add
```css
    <link rel="stylesheet" href="bower_components/material-date-picker/build/styles/mbdatepicker.css/>
    <script src="bower_components/material-date-picker/build/mbdatepicker.js"></script>
```

##Usage
###Attributes
```html

	<mb-datepicker element-id='date1'
	               input-class="testClass"
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

The input-class attribute can be overridden in the following way: 



An example is provided.

##Known issues
If you can't find the SVG images, look in the images map of the bower component and copy these to your own images map. I left this as an open option.
The datepicker is known to throw a JQuery light error because of the way the styles are applied to generate enabled or disabled dates.
It does not lag the performance, I find it to be ugly, it will be the next thing on my list to fix.

##Notes
The datepicker has changed enormously since the last commit, thinking no one used it I did not update the documents so here's an update

If you have an improvement or request please let me know or post a pull request
