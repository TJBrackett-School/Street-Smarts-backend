const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoURL = 'mongodb://localhost:8888/Users';
var mongoDB = mongoose.connect(mongoURL).connection;

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

var corsOptions = {
	origin: 'http://localhost:8000',
	optionsSuccessStatus: 200
};

mongoose.connect('mongodb://localhost:8888/Users');

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(8888, () => {
	console.log('Server started.');
});

app.route('/api/books').get((req, res) => {
	res.send({
		books: [{title: '1984'}, {title: 'Game of Thrones'}]
	});
});

app.route('/api/books/:title').get((req, res) => {
	const requestedTitle = req.params['title'];
	res.send({title:requestedTitle});
	console.log("Get works.")
});

app.route('/api/books').post((req, res) => {
	res.send(201, req.body);
});

app.route('/api/books/:title').put((req, res) => {
	res.send(200, req.body);
});

app.route('/api/books/:title').delete((req, res) => {
	res.sendStatus(204);
});

