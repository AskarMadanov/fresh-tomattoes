
/** Import dependencies */
const {engine} = require('express-handlebars');
const express = require('express');

/** Init app */
const app = express();

/** Middlewares and Setups */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


/** Routes */
app.get('/', (req,res) => {
    res.render('home', { msg: 'Handlebars are Cool!' })
})


/** Listen */
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})






