/** @format */
const {
	upCandidates22,
	getCandidateById,
	getCandidate,
	findUpCandidateByConstituency,
} = require('../controller/candidates');
const candidate = require('../models/candidate');
const router = require('express').Router();

// router.get('/', async (req, res) => {
// 	const data = await candidate.find({}).exec();
// 	return res.json(data);
// });

router.param('candidateId', getCandidateById);

router.get('/up/all/2022', upCandidates22);
router.get(
	'/up/candidate/2022/constituency/:Constituency',
	findUpCandidateByConstituency,
);
router.get('/up/candidate/2022/:candidateId', getCandidate);

module.exports = router;
