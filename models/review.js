/** @format */

const mongoose = require('mongoose');
const User = require('./user');

const ReviewSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		candidate: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Candidate',
		},
		comment: {
			type: String,
			required: true,
		},
		rating: { type: String },
	},
	{
		toObject: { getters: true },
		toJSON: { getters: true },
		timestamps: true,
	},
);

module.exports = mongoose.model('Review', ReviewSchema);
