/** @format */
const app = require('express')();
require('dotenv').config();

const candidateRoutes = require('./routes/candidates');

const mongoose = require('mongoose');
const { parse } = require('dotenv');

mongoose.connect(process.env.LOCALDATABASE || process.env.DATABASE, () => {
	console.log('connected to DB');
});

app.use('/', candidateRoutes);

app.get('*', (req, res) => {
	return res.json({
		msg: {
			Up: 'GET /up/2022',
		},
	});
});

app.listen(process.env.PORT);
