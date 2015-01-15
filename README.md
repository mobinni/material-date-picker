## Angular material datepicker
![Alt text](http://i.imgur.com/zAlNOIe.png)


This small component is still in production it's a simple date picker based on the angular-material port of polymer by the people behind ionic

https://material.angularjs.org/

##Install
This component is bower registered 
```css
bower install material-date-picker
```
All the necessary files will be automatically included in your index.html if not add
```css
    <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
    <link rel="stylesheet" href="bower_components/material-date-picker/build/styles/main.css" />
    
    <script src="bower_components/angular-strap/dist/angular-strap.js"></script>
    <script src="bower_components/angular-strap/dist/angular-strap.tpl.js"></script>
    <script src="bower_components/angular-aria/angular-aria.js"></script>
    <script src="bower_components/hammerjs/hammer.js"></script>
    <script src="bower_components/angular-material/angular-material.js"></script>
    
    <script src="bower_components/material-date-picker/build/datepicker.js"></script>
```

##Usage
###Attributes
```html
<md-date-picker text-color="#42DFDFD" line-color="#EFEFDF"></md-date-picker>
```

With the following attributes you can adjust the text color or border color of the input without lifting a css finger
However if you want to adjust the datepicker inner-colors, as for now you have to override those in css.

The inner table for the datepicker has tr > td > button .btn-primary, .btn-default classes that you can override to get the color you want for the currently selected date and the date of today.

##Known issues
###Angular UI Booststrap
This component does not work well in conjuction with Angular UI Boostrap. This library has certain similar features that would
make existing functionality break when installing this component. $modal.open for instance from the Angular UI library would not work.

I strongly advise only to use this component if you're using Angular-Strap out of the box. You can always try to mix the two, but issues may occur.

##Notes
If you want to change datepicker css properties look at angular-strap datepicker html files

If you have an improvement or request please let me know or post a pull request
P.S: Date validation is not included as of yet
