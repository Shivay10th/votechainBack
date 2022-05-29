/** @format */

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { expressjwt: ejwt } = require('express-jwt');
const { check, validationResult } = require('express-validator');

exports.signUp = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			console.log(err);
			return res.status(400).json({
				error: err.message.split(':')[2],
			});
		}
		return res.json({ name: user.name, email: user.email });
	});
};
exports.signIn = (req, res) => {
	const errors = validationResult(req);
	const { email, password } = req.body;
	console.log(email);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			error: errors.array()[0].msg,
		});
	}
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'Email does not exist.',
			});
		}
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: 'Wrong Password.',
			});
		}
		//token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		//puting token in cookie
		res.cookie('token', token, { expire: new Date() + 999 });
		//response to frontend
		const { _id, email, name, pancard, role } = user;
		return res.json({
			token,
			user: {
				_id,
				name,
				email,
				pancard,
				role,
			},
		});
	});
};
exports.logOut = (req, res) => {
	res.clearCookie('token');
	res.json({
		message: 'Logged out',
	});
};

exports.isLoggedIn = ejwt({
	secret: process.env.SECRET,
	algorithms: ['HS256'],
	userProperty: 'auth',
});

exports.isAuthenticated = (req, res, next) => {
	const checker = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!checker) {
		return res.status(403).json({
			error: 'ACCESS DENIED',
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: 'Your are not admin',
		});
	}
	next();
};
