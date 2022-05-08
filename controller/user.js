/** @format */

const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			res.status(400).json({
				error: 'No user was found in DB',
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.safe_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		req.profile._id,
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: 'User does not exist',
				});
			}
			user.salt = undefined;
			user.safe_password = undefined;
			user.createdAt = undefined;
			user.updatedAt = undefined;
			return res.json({
				user,
			});
		},
	);
};
