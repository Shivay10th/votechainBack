/** @format */
const {
	upCandidates22,
	findUpCandidates22,
} = require('../controller/candidates');
const router = require('express').Router();

router.get('/up/all/2022', upCandidates22);
router.get('/up/candidate/2022', findUpCandidates22);

module.exports = router;
