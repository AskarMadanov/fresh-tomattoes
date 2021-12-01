
/** Import dependencies */
const { engine } = require('express-handlebars');
const express = require('express');
const mongoose = require('mongoose');

/** Init app */
const app = express();

/** Middlewares and Setups */
// handlebar setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
// allows express to see form data that is coming in from a POST reques
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


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



// Schema Model
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
  });


/** Routes */
// INDEX
app.get('/', (req, res) => {
    // find from database
    Review.find().lean()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
});

// NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
    // data coming inside req.body
    console.log(req.body);

    Review.create(req.body).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

/** Listen */
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// NodeJS -> Mongoose -> MongoDB