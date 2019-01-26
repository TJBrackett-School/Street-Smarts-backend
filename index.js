const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

var corsOptions = {
	origin: 'http://www.example.com',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(4200, () => {
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
