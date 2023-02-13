require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/routes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

// error handling from server
app.use((error, req, res, next) => {
	const status = error.errorStatus || 500;
	const message = error.message;
	const data = error.data;

	res.status(status).json({ message, data });
});

const PORT = process.env.PORT || 8910;
const DB = process.env.DATABASE_URI;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(`${DB}`, options)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`⭐ http://localhost:${PORT}`);
		});

		app.get('/', (req, res) => {
			res.cookie('tesCookie', 'cookie');
			res.send(`HELLO SERVER!`);
		});
	})
	.catch((err) => console.log('error => ', err));
