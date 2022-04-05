/** @format */
const Candidate = require('../models/candidate');
const fs = require('fs');

exports.upCandidates22 = async (req, res) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const results = {};

	const total = await Candidate.estimatedDocumentCount({}).exec();

	if (endIndex < total) {
		results.next = {
			page: page + 1,
			limit: limit,
		};
	}
	if (startIndex > 0) {
		results.prev = {
			page: page - 1,
			limit: limit,
		};
	}

	results.totalCandidates = total;

	Candidate.find({}, '-_id -__v')
		.limit(limit)
		.skip(startIndex)
		.exec()
		.then((data) => {
			results.Candidates = data;
			return res.json(results);
		})
		.catch((e) => {
			return res.json({
				error: 'Something is Missing',
			});
		});
};

exports.findUpCandidates22 = (req, res) => {
	const { Constituency } = req.body;

	// To find matching pattern
	const regxp = new RegExp(Constituency.toUpperCase());

	Candidate.find({
		Constituency: {
			$regex: regxp,
		},
	})
		.then((data) => {
			return res.json({
				data,
			});
		})
		.catch((e) => {
			return res.json({
				error: e.message,
			});
		});
};
