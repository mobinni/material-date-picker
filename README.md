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

For example:
```css
md-input-group.md-input-focused input, md-input-group.md-input-focused textarea, .md-input-group.md-input-focused input, .md-input-group.md-input-focused textarea {
  border-color: #00897b;
}
```

Fixes will be implemented soon if you want to contribute please submit a pull request
