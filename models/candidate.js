/** @format */

const mongoose = require('mongoose');

const Candidate = new mongoose.Schema({
	name: String,
	Constituency: String,
	party: String,
	criminalCases: Number,
	education: String,
	total_assets: String,
	year: String,
});

module.exports = mongoose.model('candidates', Candidate);
