
const exphbs = require('express-handlebars');
const express = require('express')
const app = express()
var hbs = exphbs.create({
    defaultLayout: 'main',
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//app.js

app.get('/', (req,res) => {
    res.send('home', { msg: 'Handlebars are Cool!' })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})






