
/** Import dependencies */
const { engine } = require('express-handlebars');
const express = require('express');
const mongoose = require('mongoose');

/** Init app */
const app = express();

/** Middlewares and Setups */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/** Database Connection */
const db_username = 'admin';
const db_password = 'admin';
const MONGODB_URL = `mongodb+srv://${db_username}:${db_password}@reviews.gxcmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(MONGODB_URL, connectionParams)
    .then(() => {
        console.log('Connected to Mongo database!!! ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



// Schema
const Review = mongoose.model("Review", {
    title: String,
    movieTitle: String,
  });


// OUR MOCK ARRAY OF PROJECTS


/** Routes */
// INDEX
app.get('/', (req, res) => {
    // find from database
    Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

/** Listen */
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// NodeJS -> Mongoose -> MongoDB