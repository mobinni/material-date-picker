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
    <link rel="stylesheet" href="bower_components/material-date-picker/build/styles/main.css" />
    <script src="bower_components/material-date-picker/build/datepicker.js"></script>
```

##Usage
If you want to change the color of the input border change this css property
```css
md-input-group.md-input-focused input, md-input-group.md-input-focused textarea, .md-input-group.md-input-focused input, .md-input-group.md-input-focused textarea {
  border-color: #00897b;
}
```
###Text color
```html
<md-date-picker text-color="#42DFDFD"></md-date-picker>
```

add a property textColor to the directive
##Notes
If you want to change datepicker css properties look at angular-strap datepicker html files

If you have an improvement or request please let me know or post a pull request
P.S: Date validation is not included as of yet
