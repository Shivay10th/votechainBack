/** @format */

const mongoose = require('mongoose');
const User = require('./user');

const ReviewSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	body: {
		type: String,
		required: true,
	},
});

ReviewSchema.post('remove', (doc, next) => {
	
	next();
});

module.exports = mongoose.model('Review', ReviewSchema);
