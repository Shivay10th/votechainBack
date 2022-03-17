/** @format */
const app = require('express')();

const candidateRoutes = require('./routes/candidates');

const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://shivamyadav:zNquP9m3CubzKxqP@votechain.mfqfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	() => {
		console.log('connected to DB');
	},
);

app.use('/', candidateRoutes);

app.get('*', (req, res) => {
	return res.json({
		msg: {
			Up: 'visit /up/2022',
		},
	});
});

app.listen(3000);
