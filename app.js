var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var port = parseInt(process.env.PORT, 10) || 3000;
var db = require('./db/dbCon.js');
var session = require('express-session');

//Current directory + /public/html/ folder
var viewsPath = __dirname + '/public/html/';
var routePath = __dirname + '/routes/';



//Body-parser handles incoming POST requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use('/', router);
app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});

router.post('/register/', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;

    console.log(firstName);

    try {
    db.query('insert into user (firstName, lastName, email, password, address) values(?,?,?,?,?)',
            [firstName, lastName, email, password, address]);
    } catch (e) {
        console.log(e);
        throw e;
    }
});


//Simple get routing for serving the views to the user
router.post('/', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    //checks user input against database to see if account exists and email matches password
    if (email && password) {
        db.query('select * from user where email = ? and password = ?', [email, password], (error, results, fields) => {
            if (results.length > 0) {
                var username = email.split("@", 1);
                console.log(results.firstName);
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect(viewsPath + 'home/' + username);
            } else {
                res.send('Incorrect Email and/or Password.');
            }
            res.end();
        });
    } else {
        res.send('Please enter a Email and Password.');
        res.end();
    }
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    //checks user input against database to see if account exists and email matches password
    if (email && password) {
        db.query('select * from user where email = ? and password = ?', [email, password], (error, results, fields) => {
            if (results.length > 0) {
                var username = email.split("@", 1);
                console.log(results.firstName);
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect(viewsPath + 'home/');
            } else {
                res.send('Incorrect Email and/or Password.');
            }
            res.end();
        });
    } else {
        res.send('Please enter a Email and Password.');
        res.end();
    }
});

router.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '.');
        console.log(req.session.username);
    } else {
        res.send('Please login to view this page.');
    }
    res.end();
});

//Throw 404 error if route not found
app.use('*', (req, res) => {
    res.send('Error 404: Not Found!');    
});