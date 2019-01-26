const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoURL = 'mongodb://localhost:8888/Users';
const mongoDB = mongoose.connect(mongoURL).connection;

mongoDB.on('error', function(err) {console.log(err.message); });
mongoDB.once('open', function() {
	console.log("mongodb connection open");
});

var UserSchema = new Schema ({
	accountName: String,
	firstName: String,
	lastName: String,
	address: String,
	library: {
		book: {
			title: String,
			author: String,
			genre: String,
			timesCheckedOut: Number
		},	
	},
	checkedOut: {
		bookTitle: String,
		bookOwner: String,
		returnDate: Date
	}
});
const User = mongoose.model('Users', UserSchema);
*/

var corsOptions = {
	origin: 'http://www.example.com',
	optionsSuccessStatus: 200
};



app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(9521, () => {
	console.log('Server started.');
});

app.route('/api/books').get((req, res) => {
	res.send({
		books: [{title: '1984'}, {title: 'Game of Thrones'}]
	});
});
//Route test
app.get('/', function(req, res) {
	res.send('Works!');
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

