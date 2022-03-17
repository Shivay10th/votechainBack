/** @format */
const { upCandidates22 } = require('../controller/candidate');
const router = require('express').Router();

router.get('/', (req, res) => {
	return res.send('hello');
});

router.get('/up/2022', upCandidates22);

module.exports = router;
