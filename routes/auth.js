/** @format */

const router = require('express').Router();

const { logOut, signUp, signIn, isLoggedIn } = require('../controller/auth');
const { check, validationResult } = require('express-validator');

router.post(
	'/signup',
	[
		check('name')
			.isLength({ min: 3 })
			.withMessage('Name must be at least 3 chars long'),
		check('email').isEmail().withMessage('Invalid Email'),
		check('password')
			.isLength({ min: 5 })
			.withMessage('Password must be at least 5 chars long'),
	],
	signUp,
);
router.post(
	'/signin',
	[
		check('email').isEmail().withMessage('Invalid Email'),
		check('password')
			.isLength({ min: 1 })
			.withMessage('Password is required'),
	],
	signIn,
);

router.get('/logout', logOut);

module.exports = router;
