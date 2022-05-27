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
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.LOCALDATABASE, () => {
	console.log('connected to DB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/api/', candidateRoutes);
app.use('/api/', reviewRoutes);
app.use('/api/', authRoutes);
app.use('/api/', districtRoutes);
app.get('*', (req, res) => {
	return res.json({
		msg: {
			Up: 'GET /up/all/2022',
		},
	});
});

app.listen(process.env.PORT, () => console.log('Server started'));
