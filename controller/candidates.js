/** @format */
const Candidate = require('../models/candidate');

const { default: axios } = require('axios');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const candidate = require('../models/candidate');

exports.updateCandidate = (req, res) => {
	const candidateID = req.params.candidateId;
	console.log(req.body);
	const { name, Constituency, party, education, criminalCases } = req.body;
	Candidate.findById(candidateID)
		.then((doc) => {
			doc.name = name;
			doc.Constituency = Constituency;
			doc.party = party;
			doc.education = education;
			doc.criminalCases = criminalCases;
			doc.save()
				.then((data) => {
					console.log(data);
					return res.json(data);
				})
				.catch((err) => {
					return res.json({
						error: 'error ocurred while updating candidate ',
					});
				});
		})
		.catch((err) => {
			return {
				error: "can't find candidate for updating",
			};
		});
};

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
	const ratings = req.Candidate.ratings;
	let newsArticles = [];

	const newsAPI = `https://newsapi.org/v2/everything?q="${candidate.name}"OR"${candidate.Constituency}"&apiKey=${process.env.NEWSAPI}`;

	const result = await axios.get(newsAPI);
	newsArticles = [...result.data.articles];
	candidate.newsArticles = newsArticles;
	candidate.ratings = ratings;
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
	console.log('In all');

	results.totalCandidates = total;

	Candidate.find({}, '-__v -reviews')
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

exports.findUpCandidateByConstituency = (req, res) => {
	// console.log(req.params);
	const { Constituency } = req.params;
	// console.log(Constituency === 'AGRA CANTT. (SC)');

	// // To find matching pattern
	// const regxp = new RegExp(Constituency.toUpperCase());
	// console.log(regxp);
	Candidate.find({
		Constituency: Constituency,
	})
		.populate('reviews')
		.exec()
		.then(async (data) => {
			const Cd = data[0].toObject();
			const ratings = data[0].ratings;
			let newsArticles = [];

			const newsAPI = `https://newsapi.org/v2/everything?q="${Cd.name}"OR"${Cd.Constituency}"&apiKey=${process.env.NEWSAPI}`;

			const result = await axios.get(newsAPI);
			newsArticles = [...result.data.articles];
			Cd.newsArticles = newsArticles;
			Cd.ratings = ratings;
			return res.json(Cd);
		})
		.catch((e) => {
			return res.json({
				error: e.message,
			});
		});
};
