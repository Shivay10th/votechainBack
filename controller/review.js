/** @format */

const res = require('express/lib/response');
const Review = require('../models/review');
const user = require('../models/user');

exports.getAllReview = () => {
	Review.find({})
		.then((data) => {
			if (data.err) {
				return res.status(400).json({
					error: 'error occured while fetching all review',
				});
			} else {
				return res.json(data);
			}
		})
		.catch((err) => {
			console.log(err.message);
			return res.status(400).json({
				error: 'error occured while fetching all review',
			});
		});
};
exports.getAllReviewOfUser = (req, res) => {
	return res.json(req.profile.reviews);
};

exports.CreateReview = (req, res) => {
	const Candidate = req.Candidate;
	console.log(req.body);
	Review.create(
		{ comment: req.body.comment, rating: req.body.rating },
		async (err, review) => {
			if (err)
				return res.json({
					error: 'err in saving comment',
				});
			else {
				Candidate.reviews.push(review);
				console.log(review);
				console.log(Candidate.ratings);
				Candidate.ratings = review.rating;
				Candidate.save();

				req.profile.reviews.push(review);
				await req.profile.save();
				review.author = req.profile._id;
				review.ratings = req.body.ratings;
				review.candidate = Candidate._id;
				review.markModified('ratings');
				await review.save();
				return res.json(Candidate);
			}
		},
	);
};

exports.UpdateReview = (req, res) => {
	const reviewID = req.params.reviewId;
	const userID = req.profile._id;
	Review.findById(reviewID)
		.then((review) => {
			if (review.author._id.equals(userID)) {
				review.body = req.body.body;
				review.save();
				return res.json(review);
			} else {
				return res.json({
					error: 'not valid author',
				});
			}
		})
		.catch((e) => {
			return res.json({
				error: 'Something went wrong while retriving REview by ID',
			});
		});
};
exports.DeleteReview = (req, res) => {
	const reviewID = req.params.reviewId;
	const userID = req.profile._id;
	Review.findById(reviewID)
		.then(async (review) => {
			if (review.author.equals(userID) || req.profile.role === 1) {
				const doc = await review.remove();
				req.profile.reviews = req.profile.reviews.filter(
					(review) => review.toString() !== reviewID,
				);
				await req.profile.save();
				console.log(doc);
				return res.json({
					message: 'Review Deleted Successfully.',
				});
			} else {
				return res.json({
					error: 'Not authorize to delete this review.',
				});
			}
		})
		.catch((e) => {
			return res.json({
				error: 'Something went wrong while retriving REview by ID',
			});
		});
};
