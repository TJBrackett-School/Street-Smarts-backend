//TODO - move each route into seperate module.
var express = require('express'),
    app = express(),
    //Body-parser handles incoming POST requests.
    bodyParser = require('body-parser'),
    router = express.Router(),
    port = parseInt(process.env.PORT, 10) || 3000,
    //Connection to the mysql db.
    db = require('./db/dbCon.js'),
    /*
    For making external api requests.
    request = require('request'),
    */
    //For creating the jwt.
    jwt = require('jsonwebtoken'),
    //Encryption for passwords
    bcrypt = require('bcryptjs'),
    //Secret keys for jwt.
    secretKey = "Final290";
    publicKey = "290Final";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
//Creates new database entry for new users.
router.post('/register/', (req, res) => {
    var firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        address = req.body.address,
        username = req.body.username,
        password = bcrypt.hashSync(req.body.password);

    //Make sure the user input something in every field
    if (email && password && firstName && lastName && address && username) {
        try {
            //Check to see if an account was already created using either the input email or username.
            db.query('select * from user where email = ? or username = ?', [email, username], (error, results) => {
                if(error) {
                    res.status(500).send('Server error.');
                } else if (results.length > 0) {
                    res.send('Account already exists.');
               } else {
                    try {
                        //Creates new account in mysql
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


//TODO - check if jwt exists, if so, redirect to home using credentials.
router.post('/', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

    //checks user input against database to see if account exists and username matches password
    if (username && password) {
        try {
            //Checks if username and password make any records
                db.query('select * from user where username = ?', [username], (error, results) => {
                    if(error) {
                        return res.status(500).send('Server error.');
                    //If > 0, an account exists with that username.
                    } else if (results.length === 0) {
                        return res.status(404).send('User not found.');
                    } else {
                        userPassword = results[0].password;
                        comparePasswords = bcrypt.compareSync(password, userPassword);
                        if (!comparePasswords){
                            res.status(401).send('Invalid password.');
                        } else {
                            userID = results[0].userID;
                            address = results[0].address;
                            firstName = results[0].firstName;
                            username = results[0].username;
                            var payload = {
                                id: userID,
                                address: address,
                                firstName: firstName
                            };
                            var signOptions = {
                                issuer: "290 Final Team 2",
                                subject: username,
                                audience: "StreetSmarts",
                                expiresIn: "12h",
                                algorithm: "HS256"
                            };
                            var token = jwt.sign(payload, secretKey, signOptions);
                            console.log("Access token " + token);

                            res.status(200).send(token);
                        }
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
//TODO - check if jwt exists, if so, redirect to home using credentials.
router.post('/login', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

    //checks user input against database to see if account exists and username matches password
    if (username && password) {
        try {
            //Checks if username and password make any records
                db.query('select * from user where username = ?', [username], (error, results) => {
                    if(error) {
                        return res.status(500).send('Server error.');
                    //If > 0, an account exists with that username.
                    } else if (results.length === 0) {
                        return res.status(404).send('User not found.');
                    } else {
                        userPassword = results[0].password;
                        comparePasswords = bcrypt.compareSync(password, userPassword);
                        if (!comparePasswords){
                            res.status(401).send('Invalid password.');
                        } else {
                            userID = results[0].userID;
                            address = results[0].address;
                            firstName = results[0].firstName;
                            username = results[0].username;
                            var payload = {
                                id: userID,
                                address: address,
                                firstName: firstName
                            };
                            var signOptions = {
                                issuer: "290 Final Team 2",
                                subject: username,
                                audience: "StreetSmarts",
                                expiresIn: "12h",
                                algorithm: "HS256"
                            };
                            var token = jwt.sign(payload, secretKey, signOptions);
                            console.log("Access token " + token);

                            res.status(200).send(token);
                        }
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
//Use jwt to set user
router.get('/home/:user/:search', (req, res) => {
    //Will search for books by title, author, genre, etc. from other users in a desired radius.
});
/*TODO
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
    res.status(404).send('Error 404: Not Found!');    
});
/*TODO
    - pull book info from api
    - setup table in mysql to store what books are in the user's library using openlibrary api
*/