//To-do - move each route into seperate module.
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    port = parseInt(process.env.PORT, 10) || 3000,
    db = require('./db/dbCon.js');

//Current directory + /public/html/ folder
var viewsPath = __dirname + '/public/html/';

//Setup jwt. Secret = "290Final"

//Body-parser handles incoming POST requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});

router.post('/register/', (req, res) => {
    var firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password,
        address = req.body.address,
        username = req.body.username;

    //Make sure the user input something in every field
    if (email && password && firstName && lastName && address && username) {
        try {
            //Check to see if an account was already created using either the input email or username.
            db.query('select * from user where email = ? or username = ?', [email, username], (error, results, fields) => {
               if (results.length > 0) {
                    res.send('Account already exists.');
                //Creates new account in mysql
               } else {
                    try {
                      db.query('insert into user (firstName, lastName, email, password, address, username) values(?,?,?,?,?,?)',
                        [firstName, lastName, email, password, address, username]);
                    } catch (e) {
                        console.log(e);
                        throw e;
                    }
                }
                res.end();
             });
        } catch (e) {
            console.log(e);
            throw e;
        }
    } else {
        res.send('Please enter information in all fields.');
        res.end();
    }
});


//To-do - check if jwt exists, if so, redirect to home using credentials.
router.post('/', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

    //checks user input against database to see if account exists and username matches password
    if (username && password) {
        try {
            //Checks if username and password make any records
            db.query('select * from user where username = ? and password = ?', [username, password], (error, results, fields) => {
                //If > 0, an account exists with that username and password combination.
                if (results.length > 0) {
                    //Temporary. Will send a jwt with username, firstName, and address.
                    res.redirect(viewsPath + 'home/');
               } else {
                   res.send('Incorrect Username and/or Password.');
                }
                res.end();
             });
        } catch (e) {
            console.log(e);
            throw e;
        }
    } else {
        res.send('Please enter a Username and Password.');
        res.end();
    }
});
//To-do - check if jwt exists, if so, redirect to home using credentials.
router.post('/login', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

    //checks user input against database to see if account exists and username matches password
    if (username && password) {
        //Checks if username and password make any records
        db.query('select * from user where username = ? and password = ?', [username, password], (error, results, fields) => {
            //If > 0, an account exists with that username and password combination.
            if (results.length > 0) {
                //Temporary. Will send a jwt with username, firstName, and address.
                res.redirect(viewsPath + 'home/');
            } else {
                res.send('Incorrect Username and/or Password.');
            }
            res.end();
        });
    } else {
        res.send('Please enter a Username and Password.');
        res.end();
    }
});
//Use jwt to set user
router.get('/home/:user/:search', (req, res) => {
    //Will search for books by title, author, genre, etc. from other users in a desired radius.
});
/*To-do for account:
        - get - populate user's library on load.
        - post - add books to library.
        - delete - delete book from library.
        - delete - delete user's account.
*/
router.get('/account/:user', (req, res) => {

});

router.post('/account/:user', (req, res) => {
    
});

router.delete('/account/:user/:book', (req, res) => {
    
});

router.delete('/account/:user', (req, res) => {
    
});

//Throw 404 error if route not found
app.use('*', (req, res) => {
    res.send('Error 404: Not Found!');    
});
/*To-do:
        - pull book info from api
        - setup table in mysql to store what books are in the user's library using openlibrary api
*/