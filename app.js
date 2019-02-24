var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

//Current directory + /views/ folder
var viewsPath = __dirname + '/public/html/';
var apiPath = __dirname + '/api/';


app.use('/', router);
//Supports json encoded bodies
app.use(bodyParser.json());
//Supports encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

//Simple get routing for serving the views to the user
router.get('/', (req, res) => {
    res.sendFile(viewsPath + 'login.html');
});

router.get('/login', (req, res) => {
    res.sendFile(viewsPath + 'login.html');
});

router.get('/home', (req, res) => {
    res.sendFile(viewsPath + 'home.html');
});

router.get('/account', (req, res) => {
    res.sendFile(viewsPath + 'account.html');
});

router.get('/register', (req, res) => {
    res.sendFile(viewsPath + 'register.html');
});
//Throw 404 error if route not found
app.use('*', (req, res) => {
    res.send('Error 404: Not Found!');    
});

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});