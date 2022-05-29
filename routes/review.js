/** @format */
const router = require('express').Router();

const { isLoggedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const { getCandidateById } = require('../controller/candidates');
const {
	CreateReview,
	UpdateReview,
	DeleteReview,
	getAllReview,
	getAllReviewOfUser,
} = require('../controller/review');
const { getUserById } = require('../controller/user');

router.param('candidateId', getCandidateById);
router.param('userId', getUserById);

router.get('/allreview', isLoggedIn, isAuthenticated, isAdmin, getAllReview);
router.get(
	'/allreview/:userId',
	isLoggedIn,
	isAuthenticated,
	getAllReviewOfUser,
);

router.post(
	'/candidate/:candidateId/review/create/:userId',
	isLoggedIn,
	isAuthenticated,
	CreateReview,
);

router.put(
	'/candidate/:candidateId/review/:reviewId/:userId',
	isLoggedIn,
	isAuthenticated,
	UpdateReview,
);

router.delete(
	'/candidate/:candidateId/review/:reviewId/:userId',
	isLoggedIn,
	isAuthenticated,
	DeleteReview,
);

module.exports = router;
