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
    <link rel="stylesheet" href="bower_components/material-date-picker/build/styles/mbdatepicker.css/>
    
    
    <script src="bower_components/material-date-picker/build/mbdatepicker.js"></script>
```

##Usage
###Attributes
```html

<mb-datepicker element-id='date1'
               date-message=""
               text-color="#EFEF23"
               line-color="#DDFE66"
               date="date"
               date-format="YYYY-MM-DD"></mb-datepicker>
```

With the following attributes you can adjust the text color or border color of the input without lifting a css finger
However if you want to adjust the datepicker inner-colors, as for now you have to override those in css.


##Known issues
If you can't find the SVG images, look in the images map of the bower component and copy these to your own images map. I left this as an open option.
##Notes
The datepicker has changed enormously since the last commit, thinking no one used it I did not update the documents so here's an update

If you have an improvement or request please let me know or post a pull request
