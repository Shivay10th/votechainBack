/** @format */
const Candidate = require('../models/candidate');

const { default: axios } = require('axios');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');

exports.getCandidateById = (req, res, next, id) => {
	Candidate.findById(id)
		.populate('reviews')
		.exec(async (error, data) => {
			if (error || !data) {
				return res.status(400).json({
					error: 'File is not here',
					e: error,
				});
			}

			req.Candidate = data;
			next();
		});
};

exports.getCandidate = async (req, res) => {
	const candidate = req.Candidate.toObject();
	let newsArticles = [];

	const newsAPI = `https://newsapi.org/v2/everything?q="${candidate.name}"OR"${candidate.Constituency}"&apiKey=${process.env.NEWSAPI}`;

	const result = await axios.get(newsAPI);
	newsArticles = [...result.data.articles];
	candidate.newsArticles = newsArticles;
	return res.json(candidate);
};

exports.upCandidates22 = async (req, res) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const results = {};

	const total = await Candidate.find({}).lean().count();

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

		.populate('reviews')
		.limit(limit)
		.skip(startIndex)
		.exec()
		.then((data) => {
			results.Candidates = data;
			return res.json(results);
		})
		.catch((e) => {
			console.log(e);
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
