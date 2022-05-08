/** @format */

const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
	name: String,
	constituency: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model('district', districtSchema);
