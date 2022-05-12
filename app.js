/** @format */
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const candidateRoutes = require('./routes/candidates');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const districtRoutes = require('./routes/district');

const mongoose = require('mongoose');
const candidate = require('./models/candidate');

mongoose.connect(process.env.LOCALDATABASE, () => {
	console.log('connected to DB');
});

app.use(express.json());
app.use(cors());

app.use('/', candidateRoutes);
app.use('/', reviewRoutes);
app.use('/', authRoutes);
app.use('/', districtRoutes);
app.get('*', (req, res) => {
	return res.json({
		msg: {
			Up: 'GET /up/all/2022',
		},
	});
});

app.listen(process.env.PORT, () => console.log('Server started'));
