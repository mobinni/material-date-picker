## Angular material datepicker
This small component is still in production it's a simple date picker based on the angular-material port of polymer by the people behind ionic
##Usage
This component is bower registered 
```css
bower install material-date-picker
```
All the necessary files will be automatically included in your index.html if not add
```css
    <link rel="stylesheet" href="bower_components/material-date-picker/build/styles/main.css" />
    <script src="bower_components/material-date-picker/build/datepicker.js"></script>
```

If you want to change the color of the input border change this css property
```css
md-input-group.md-input-focused input, md-input-group.md-input-focused textarea, .md-input-group.md-input-focused input, .md-input-group.md-input-focused textarea {
  border-color: #00897b;
}
```
If you want to change datepicker properties look at angular-strap datepicker html files

If you have an improvement or request please let me know or post a pull request
P.S: Date validation is not included as of yet
