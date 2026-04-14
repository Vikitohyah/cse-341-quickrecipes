const express = require('express');
const  app = express();
const bodyParser = require('body-parser')
const routes = require('./routes');
const port = process.env.PORT || 3000;
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const session = require('express-session')
const GITHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// init passport on every route call
app.use(passport.initialize());

//enable session support for passport 
app.use(passport.session())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}));
app.use(cors({origin: '*'}));
app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

passport.use(new GITHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
    // Here you would typically find or create a user in your database
    // For this example, we'll just return the GitHub profile
    return done(null, profile);
}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
}); 

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Not logged in');
});

app.get('/github/callback', passport.authenticate('github',
    { failureRedirect: '/api-docs', session: false }),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected");

        if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
         });
        }
    }
});

module.exports = app;