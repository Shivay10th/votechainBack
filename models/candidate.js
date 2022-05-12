/** @format */

const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
	name: String,
	Constituency: String,
	party: String,
	criminalCases: Number,
	education: String,

	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
	total_assets: String,
	year: String,
});

module.exports = mongoose.model('candidates', CandidateSchema);
