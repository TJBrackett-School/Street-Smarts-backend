const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/FinalProj.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Connected to DB.")
});
const app = express();

var corsOptions = {
	origin: 'http://www.example.com',
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "Super secret."}));

app.listen(9521, () => {
	console.log('Server started.');
});


//Display login/sign up page.
app.get('/', (req, res) => {
	res.send('<h1>Welcome!</h1>');
});
//Login/signup page post
app.post('/', (res, req, next) => {
	res.send('<p>HTML paragraph.</p>');
	next();
});
//Display home page
app.get('/home', (req, res) => {
	res.send("Main page get.");
});
//Post search from home page
app.post('/home', (req, res, next) => {
	res.send("Main page post.");
	next();
});
//Display account page
app.get('/account', (req, res) => {
	res.send("Account page get.");
});
//Update account/library info
app.post('/account', (req, res, next) => {
	res.send("Account page post.")
	next();
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
/*
app.route('/api/books').get((req, res) => {
	res.send({
		books: [{title: '1984'}, {title: 'Game of Thrones'}]
	});
});

app.route('/api/books/:title').get((req, res) => {
	const requestedTitle = req.params['title'];
	res.send({title:requestedTitle});
});

app.route('/api/books').post((req, res) => {
	//res.send("Post works!");
	res.send(201, req.body);
});

app.route('/api/books/:title').put((req, res) => {
	res.send(200, req.body);
});

app.route('/api/books/:title').delete((req, res) => {
	res.sendStatus(204);
});
*/
