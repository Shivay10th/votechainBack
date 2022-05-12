/** @format */

const mongoose = require('mongoose');
const User = require('./user');

const ReviewSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	comment: {
		type: String,
		required: true,
	},
	ratings: {
		type: mongoose.Schema.Types.Mixed,
		1: Number,
		2: Number,
		3: Number,
		4: Number,
		5: Number,
		get: function (r) {
			let items = Object.entries(r);
			let sum = 0;
			let totla = 0;
			for (let [key, value] of items) {
				total += value;
				sum += value + parseInt(key);
			}
			return Math.round(sum / total);
		},
		set: function (r) {
			if (!(this instanceof mongoose.Document)) {
				if (r instanceof Object) return r;
				else throw new Error('Rating setter !!!');
			} else {
				if (r instanceof Object) return r;
				let prev = parseInt(
					this.get('ratings', null, { getters: false })[r],
				);
				this.get('ratings', null, { getters: false })[r] = 1 + prev;
				return this.get('ratings', null, { getters: false });
			}
		},
		validate: {
			validator: function (i) {
				let b = [1, 2, 3, 4, 5];
				let v = Object.keys(i).sort();
				return b.every(
					(x, j) => v.length === b.length && x === parseInt(v[j]),
				);
			},
			message: 'Invalid Star Level',
		},
		default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
	},
});

module.exports = mongoose.model('Review', ReviewSchema);
