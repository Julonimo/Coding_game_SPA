console.log("yy");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./model/Schema');

const app = express();
const port = process.env.PORT||4242;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./Routes');
routes(app);
const server = app.listen(port, () => {
	console.log("Running on localhost:", port);
});

app.use((req, res) => {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = server;
