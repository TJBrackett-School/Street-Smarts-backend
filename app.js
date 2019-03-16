var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

//Current directory + /public/html/ folder
var viewsPath = __dirname + '/public/html/';
var apiPath = __dirname + '/api/';


app.use('/', router);
//Body-parser handles incoming POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Simple get routing for serving the views to the user
router.get('/', (req, res) => {
    res.sendFile(viewsPath + 'login.html');
});

router.get('/login', (req, res) => {
    res.sendFile(viewsPath + 'login.html');
});

router.get('/login/:user', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
});

router.get('/home', (req, res) => {
    res.sendFile(viewsPath + 'home.html');
});

router.get('/home/:search', (req, res) => {
    res.send(req.params);
});

router.get('/account', (req, res) => {
    res.sendFile(viewsPath + 'account.html');
});

router.get('/register', (req, res) => {
    res.sendFile(viewsPath + 'register.html');
});
router.post('/register/:user', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
});
//Throw 404 error if route not found
app.use('*', (req, res) => {
    res.send('Error 404: Not Found!');    
});

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});