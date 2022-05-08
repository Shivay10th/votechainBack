/** @format */

const { default: mongoose } = require('mongoose');

const stateSchema = new mongoose.Schema({
	name: String,
	district: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'district',
		},
	],
});

module.exports = mongoose.model('state', stateSchema);
