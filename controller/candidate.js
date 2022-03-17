/** @format */
const Candidate = require('../models/candidate');
const fs = require('fs');

exports.upCandidates22 = (req, res) => {
	Candidate.find({}, '-_id -__v')
		.then((data) => {
			return res.json(data);
		})
		.catch((e) => {
			return res.json({
				error: 'Something is Missing',
			});
		});
};
